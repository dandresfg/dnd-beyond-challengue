import { Image } from "@/components/Image";
import styles from "./Avatar.module.css";

interface AvatarProps {
    src: string;
    alt: string;
}

export const Avatar = ({ src, alt }: AvatarProps) => {
    return (
        <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
                <Image
                    src={src}
                    alt={alt}
                    className={styles.avatarImg}
                />
            </div>
        </div>
    );
};
