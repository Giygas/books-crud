CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`publication_year` integer NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`cover_URL` text NOT NULL,
	`isbn` integer,
	`open_library_key` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_isbn_unique` ON `books` (`isbn`);