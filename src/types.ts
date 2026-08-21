
export interface BookData {
    book_title: string;
    author: string;
    isbn_number: string;
    category: string;
    reading_level: string;
    sub_category: string;
    status?: string;
}

export interface BorrowData {
    student_id: number | '';
    student_name: string;
    book_title: string;
    isbn_number: string;
    borrow_date: string;
}


export interface ReturnFormData extends BorrowData {
    return_date: string;
}

export interface BorrowedBookItem {
    book_title: string;
    author: string;
    isbn_number: string;
    category: string;
    sub_category: string;
    return_date: string | null; // null means it hasn't been returned yet
}
