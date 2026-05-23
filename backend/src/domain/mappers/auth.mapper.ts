export class AuthMapper {
  /** Strip sensitive fields for internal domain use. */
  static toDomain(entity: any) {
    if (!entity) return entity;
    const { passwordHash, verificationToken, verificationTokenExpires, ...rest } = entity;
    void passwordHash; void verificationToken; void verificationTokenExpires;
    return {
      ...rest,
      createdAt: new Date(entity.createdAt).getTime(),
      updatedAt: new Date(entity.updatedAt).getTime(),
    };
  }

  /** Safe public projection for API responses. */
  static toPublic(entity: any) {
    if (!entity) return entity;
    return {
      id: entity.id,
      email: entity.email,
      displayName: entity.displayName,
      avatarUrl: entity.avatarUrl,
      name: entity.displayName ?? entity.email ?? "User",
      profileImage: entity.avatarUrl ?? null,
      isVerified: entity.isVerified,
    };
  }
}
