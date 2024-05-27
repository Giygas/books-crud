CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`publication_year` integer NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`cover_id` integer NOT NULL,
	`isbn` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_isbn_unique` ON `books` (`isbn`);