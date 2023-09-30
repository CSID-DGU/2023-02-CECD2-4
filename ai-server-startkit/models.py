import torch
from torch import nn
import numpy as np
from transformers import BertModel
from torch.utils.data import Dataset

from sentence_transformers import SentenceTransformer, util
import numpy as np

# Hugging Face를 통한 모델 및 토크나이저 Import
from transformers import BertModel, AutoTokenizer

# KcBERT
class KcBERT():
    def __init__(self):
        # Setting parameters
        self.max_len = 128
        self.batch_size = 32
        self.warmup_ratio = 0.1
        self.num_epochs = 10
        self.max_grad_norm = 1
        self.log_interval = 200
        self.learning_rate = 4e-5

        # KcBERT
        self.model_name = "beomi/kcbert-base"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.bertmodel = BertModel.from_pretrained(self.model_name, return_dict=False)

        # load model
        self.device = torch.device('cpu')
        self.model = self.BERTClassifier(self.bertmodel,  dr_rate=0.5).to(self.device)
        self.model.load_state_dict(torch.load('models\KcBERT-emotions-model_state_dict3.pt',  map_location=torch.device('cpu')))  # state_dict를 불러 온 후, 기존 모델에 저장
        

    class BERTSentenceTransform:
        r"""BERT style data transformation.

        Parameters
        ----------
        tokenizer : BERTTokenizer.
            Tokenizer for the sentences.
        max_seq_length : int.
            Maximum sequence length of the sentences.
        pad : bool, default True
            Whether to pad the sentences to maximum length.
        pair : bool, default True
            Whether to transform sentences or sentence pairs.
        """

        def __init__(self, tokenizer, max_seq_length, pad=True, pair=True):
            self._tokenizer = tokenizer
            self._max_seq_length = max_seq_length
            self._pad = pad
            self._pair = pair
            #self._vocab = vocab

        def __call__(self, line):
            """Perform transformation for sequence pairs or single sequences.

            The transformation is processed in the following steps:
            - tokenize the input sequences
            - insert [CLS], [SEP] as necessary
            - generate type ids to indicate whether a token belongs to the first
            sequence or the second sequence.
            - generate valid length

            For sequence pairs, the input is a tuple of 2 strings:
            text_a, text_b.

            Inputs:
                text_a: 'is this jacksonville ?'
                text_b: 'no it is not'
            Tokenization:
                text_a: 'is this jack ##son ##ville ?'
                text_b: 'no it is not .'
            Processed:
                tokens: '[CLS] is this jack ##son ##ville ? [SEP] no it is not . [SEP]'
                type_ids: 0     0  0    0    0     0       0 0     1  1  1  1   1 1
                valid_length: 14

            For single sequences, the input is a tuple of single string:
            text_a.

            Inputs:
                text_a: 'the dog is hairy .'
            Tokenization:
                text_a: 'the dog is hairy .'
            Processed:
                text_a: '[CLS] the dog is hairy . [SEP]'
                type_ids: 0     0   0   0  0     0 0
                valid_length: 7

            Parameters
            ----------
            line: tuple of str
                Input strings. For sequence pairs, the input is a tuple of 2 strings:
                (text_a, text_b). For single sequences, the input is a tuple of single
                string: (text_a,).

            Returns
            -------
            np.array: input token ids in 'int32', shape (batch_size, seq_length)
            np.array: valid length in 'int32', shape (batch_size,)
            np.array: input token type ids in 'int32', shape (batch_size, seq_length)

            """

            # convert to unicode
            text_a = line[0]
            if self._pair:
                assert len(line) == 2
                text_b = line[1]

            tokens_a = self._tokenizer.tokenize(text_a)
            tokens_b = None

            if self._pair:
                tokens_b = self._tokenizer(text_b)

            if tokens_b:
                # Modifies `tokens_a` and `tokens_b` in place so that the total
                # length is less than the specified length.
                # Account for [CLS], [SEP], [SEP] with "- 3"
                self._truncate_seq_pair(tokens_a, tokens_b,
                                        self._max_seq_length - 3)
            else:
                # Account for [CLS] and [SEP] with "- 2"
                if len(tokens_a) > self._max_seq_length - 2:
                    tokens_a = tokens_a[0:(self._max_seq_length - 2)]

            # The embedding vectors for `type=0` and `type=1` were learned during
            # pre-training and are added to the wordpiece embedding vector
            # (and position vector). This is not *strictly* necessary since
            # the [SEP] token unambiguously separates the sequences, but it makes
            # it easier for the model to learn the concept of sequences.

            # For classification tasks, the first vector (corresponding to [CLS]) is
            # used as as the "sentence vector". Note that this only makes sense because
            # the entire model is fine-tuned.
            #vocab = self._tokenizer.vocab
            #vocab = self._vocab
            tokens = []
            tokens.append("[CLS]")
            tokens.extend(tokens_a)
            tokens.append("[SEP]")
            segment_ids = [0] * len(tokens)

            if tokens_b:
                tokens.extend(tokens_b)
                tokens.append("[SEP]")
                segment_ids.extend([1] * (len(tokens) - len(segment_ids)))

            input_ids = self._tokenizer.convert_tokens_to_ids(tokens)

            # The valid length of sentences. Only real  tokens are attended to.
            valid_length = len(input_ids)

            if self._pad:
                # Zero-pad up to the sequence length.
                padding_length = self._max_seq_length - valid_length
                # use padding tokens for the rest
                input_ids.extend([1] * padding_length) # vocab[vocab.padding_token]
                segment_ids.extend([0] * padding_length)

            return np.array(input_ids, dtype='int32'), np.array(valid_length, dtype='int32'),\
                np.array(segment_ids, dtype='int32')
                
    class BERTDataset(Dataset):
        def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                    pad, pair):
            transform = KcBERT.BERTSentenceTransform(bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)
            #transform = nlp.data.BERTSentenceTransform(
            #    tokenizer, max_seq_length=max_len, pad=pad, pair=pair)
            self.sentences = [transform([i[sent_idx]]) for i in dataset]
            self.labels = [np.int32(i[label_idx]) for i in dataset]

        def __getitem__(self, i):
            return (self.sentences[i] + (self.labels[i], ))

        def __len__(self):
            return (len(self.labels))
        
    class BERTClassifier(nn.Module):
        def __init__(self,
                    bert,
                    hidden_size = 768,
                    num_classes=7,   ##클래스 수 조정##
                    dr_rate=None,
                    params=None):
            super(KcBERT.BERTClassifier, self).__init__()
            self.bert = bert
            self.dr_rate = dr_rate

            self.classifier = nn.Linear(hidden_size , num_classes)
            if dr_rate:
                self.dropout = nn.Dropout(p=dr_rate)

        def gen_attention_mask(self, token_ids, valid_length):
            attention_mask = torch.zeros_like(token_ids)
            for i, v in enumerate(valid_length):
                attention_mask[i][:v] = 1
            return attention_mask.float()

        def forward(self, token_ids, valid_length, segment_ids):
            attention_mask = self.gen_attention_mask(token_ids, valid_length)

            _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device),return_dict=False)
            if self.dr_rate:
                out = self.dropout(pooler)
            return self.classifier(out)

    # predict emtion
    def predict(self, predict_sentence):

        data = [predict_sentence, '0']
        dataset_another = [data]

        another_test = self.BERTDataset(dataset_another, 0, 1, self.tokenizer, self.max_len, True, False)
        test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=self.batch_size, num_workers=0)

        self.model.eval()

        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
            token_ids = token_ids.long().to(self.device)
            segment_ids = segment_ids.long().to(self.device)

            valid_length= valid_length
            label = label.long().to(self.device)

            out = self.model(token_ids, valid_length, segment_ids)


            test_eval=[]
            for i in out:
                logits=i
                logits = logits.detach().cpu().numpy()

                if np.argmax(logits) == 0:
                    test_eval.append("공포")
                elif np.argmax(logits) == 1:
                    test_eval.append("놀람")
                elif np.argmax(logits) == 2:
                    test_eval.append("분노")
                elif np.argmax(logits) == 3:
                    test_eval.append("슬픔")
                elif np.argmax(logits) == 4:
                    test_eval.append("중립")
                elif np.argmax(logits) == 5:
                    test_eval.append("행복")
                elif np.argmax(logits) == 6:
                    test_eval.append("혐오")

            #print("\"{}\" >> ".format(predict_sentence) + test_eval[0] + " 느껴집니다.")
            return(test_eval[0])

# kcbert = KcBERT()         
# print(kcbert.predict("하.... 이 놈의 나라 노인네들은 또 의병이 나라 지키기를 원하는 건가??? 정녕 니 후손들이 통일된 민족, 좋은 나라, 공정한 나라에서 사는 게 그렇게 싫더냐? 미친 노인네들 어휴..."))

# SBERT
class SBERT():
    def __init__(self):
        self.embedder = SentenceTransformer("jhgan/ko-sroberta-multitask")

    def analysis(self, corpus, comments):
        corpus_embeddings = self.embedder.encode(corpus, convert_to_tensor=True)

        # 댓글과 연관된 뉴스 기사의 상위 3개 문장 선택
        top_k = 3
        for query in comments:
            query_embedding = self.embedder.encode(query, convert_to_tensor=True)
            cos_scores = util.pytorch_cos_sim(query_embedding, corpus_embeddings)[0]
            cos_scores = cos_scores.cpu()

        # score 측정
        top_results = np.argpartition(-cos_scores, range(top_k))[0:top_k]
        print("\n\n======================\n\n")
        print("Comment:", query)
        print("\nTop {} most similar sentences in corpus:".format(top_k))

        result = {'text':[], 'score':[]}
        for idx in top_results[0:top_k]:
            result['text'].append(corpus[idx].strip())
            result['score'].append(round(float(cos_scores[idx]), 4))
            print(corpus[idx].strip(), "(Score: %.4f)" % (cos_scores[idx]))
        
        return result