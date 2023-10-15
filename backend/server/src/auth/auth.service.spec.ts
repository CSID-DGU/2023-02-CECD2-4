import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';

describe('class AuthService', () => {
  let authService: AuthService;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, AdminService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(adminService).toBeDefined();
  });
});
