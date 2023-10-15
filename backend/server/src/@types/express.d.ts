declare namespace Express {
  interface Request {
    user: import('../admin/util/admin.type').IOutAdminUser;
  }
}
