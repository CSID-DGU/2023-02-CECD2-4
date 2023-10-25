import pandas as pd
import csv
from models import KcBERT

def convert_emotion_to_int(e) -> int:
    if(e == "공포"):
        return 0
    elif(e == "놀람"):
        return 1
    elif(e == "분노"):
        return 2
    elif(e == "슬픔"):
        return 3
    elif(e == "중립"):
        return 4
    elif(e == "행복"):
        return 5
    elif(e == "혐오"):
        return 6
        

csv_file_path = 'CommentData\댓글데이터.csv'
data = pd.read_csv(csv_file_path, encoding='cp949')

# file
correct_file = open(".\commentTestresult\correct.txt", 'w')
wrong_file = open(".\commentTestresult\wrong.txt", 'w')

# 0: 공포 ~
emotion_cnt_arr = [0] * 7
emotion_wrong_arr = [0] * 7
emotion_correct_arr = [0] * 7

data.loc[(data['상황'] == "fear"), '상황'] = "공포"  #공포 => 0
data.loc[(data['상황'] == "surprise"), '상황'] = "놀람"  #놀람 => 1
data.loc[(data['상황'] == "angry"), '상황'] = "분노" #분노 => 2
data.loc[(data['상황'] == "sadness"), '상황'] = "슬픔"  #슬픔 => 3
data.loc[(data['상황'] == "neutral"), '상황'] = "중립"  #중립 => 4
data.loc[(data['상황'] == "happiness"), '상황'] = "행복"  #행복 => 5
data.loc[(data['상황'] == "disgust"), '상황'] = "혐오"  #혐오 => 6

data_list = []
for ques, label in zip(data['발화문'], data['상황'])  :
    data = []
    data.append(ques)
    data.append(str(label))

    data_list.append(data)
    
    emotion_cnt_arr[convert_emotion_to_int(label)] += 1

data_cnt = len(data_list)
correct = 0
wrong = 0

cnt = 0
KcBERT_model = KcBERT()
for comment_data in data_list:
    result = KcBERT_model.predict(comment_data[0])
    cnt += 1
    
    # if(cnt % 100 == 0):
    #     print(cnt)
    
    if(result == comment_data[1]):
        correct += 1
        emotion_correct_arr[convert_emotion_to_int(comment_data[1])] += 1
        correct_file.write("{} --> {}\n".format(comment_data[0], comment_data[1]))
    else:
        # 정답을 잘못 맞쳤을 때 
        # 분노(정답) --> 기쁨(결과) ==> 분노 실패 횟수 + 1
        emotion_wrong_arr[convert_emotion_to_int(comment_data[1])] += 1
        print("{} (정답: {}) --> (예측: {})".format(comment_data[0], comment_data[1], result))
        wrong_file.write("{} (정답: {}) --> (예측: {})\n".format(comment_data[0], comment_data[1], result))

wrong = data_cnt - correct
accuracy = correct / data_cnt
print("Accuray for {} data = {}".format(data_cnt, accuracy))

print(emotion_cnt_arr)
print(emotion_correct_arr)
print(emotion_wrong_arr)
for i in range(0, 7):
    print(emotion_correct_arr[i] / emotion_cnt_arr[i], end=', ')
print()

correct_file.close()
wrong_file.close()