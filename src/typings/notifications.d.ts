export interface NoticeItem extends NoticeIconData {
    id?: string;
    type: string;
    status?: string;
    link?: string;
}

export interface NoticeIconData {
    avatar?: string | React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    datetime?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    key?: string | number;
    read?: boolean;
}


