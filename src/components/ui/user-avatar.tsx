interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "size-7 text-[10px]",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
};

export function UserAvatar({ name, avatarUrl, size = "md", className = "" }: UserAvatarProps) {
  const cls = `${sizeMap[size]} rounded-full shrink-0 object-cover ${className}`;
  const initial = (name || "?").slice(0, 1).toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={cls}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty("display", "grid");
        }}
      />
    );
  }

  return (
    <div
      className={`${sizeMap[size]} rounded-full shrink-0 bg-gradient-to-br from-primary to-accent grid place-items-center font-semibold text-primary-foreground ${className}`}
    >
      {initial}
    </div>
  );
}
