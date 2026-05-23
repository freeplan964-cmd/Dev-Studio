import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class ProfileService {
  constructor(private uow: IUnitOfWork) {}

  async getByUserId(userId: string) {
    const rows = await this.uow.userProfiles.findByUserId(userId);
    return rows[0] ?? null;
  }

  async upsert(
    userId: string,
    data: { displayName?: string; avatarUrl?: string; location?: string },
  ) {
    const existing = await this.uow.userProfiles.findByUserId(userId);

    if (existing.length > 0) {
      // Find the profile ID to perform an ID-based update
      const profileId = existing[0].id;
      const r = await this.uow.userProfiles.update(profileId, data);
      return r;
    } else {
      const r = await this.uow.userProfiles.create({ userId, ...data });
      return r;
    }
  }
}


