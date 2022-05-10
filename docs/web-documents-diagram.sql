CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `email` varchar(255),
  `name` varchar(255),
  `password` password,
  `created_at` datetime,
  `modified_at` datetime
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `users_roles` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `role_id` int
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY,
  `title` varchar(255),
  `post_type_id` int NOT NULL,
  `description` varchar(255),
  `content` longtext,
  `link_pdf` varchar(255),
  `created_at` datetime DEFAULT (now()),
  `modified_at` datetime,
  `user_id` int NOT NULL
);

CREATE TABLE `post_type` (
  `id` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY,
  `description` text,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `parent_id` int,
  `created_at` datetime DEFAULT (now()),
  `modified_at` datetime
);

CREATE TABLE `post_like` (
  `id` int PRIMARY KEY,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL
);

CREATE TABLE `reports` (
  `id` int PRIMARY KEY,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `description` varchar(255),
  `resolve` boolean
);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `users_roles` (`user_id`);

ALTER TABLE `roles` ADD FOREIGN KEY (`id`) REFERENCES `users_roles` (`role_id`);

ALTER TABLE `post_type` ADD FOREIGN KEY (`id`) REFERENCES `posts` (`post_type_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`id`) REFERENCES `comments` (`parent_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`id`) REFERENCES `post_like` (`post_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `post_like` (`user_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users` COMMENT = "table 'users' contains user information";
