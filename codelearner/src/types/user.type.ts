
export interface Moderator {
    user_id: number;
    org_id: number;
    role: string;
}

export interface Organization {
    id: number;
    org_name: string;
    contact_email: string;
    website: string | null;
    description: string | null;
    logo: string | null;
    created_at: Date;
    updated_at: Date;
    pivot: Moderator;
}

export interface Submission {
    id: string;
    source_code: string;
    language: number;
    points: number;
    time: number;
    memory: number;
    result: string;
    user_id: number;
    problem_id: string;
    org_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserCourse{
    user_id: number;
    course_id: number;
}

export interface Course {
    id: number;
    name: string;
    description: string | null;
    short_description: string;
    fee: number | 0.0;
    currency: string | null;
    created_at: Date;
    org_id: number;
    pivot: UserCourse;
}

export interface UserDetail {
    id: number;
    full_name: string;
    account_name: string;
    email: string;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
    about: string;
    submissions: Submission[];
    organizations: Organization[];
    courses: Course[];
}

