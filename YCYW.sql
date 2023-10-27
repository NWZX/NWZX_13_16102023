CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL
);

CREATE TABLE `users_address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `street_1` varchar(255) NOT NULL,
  `street_2` varchar(255),
  `zipcode` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL
);

CREATE TABLE `admin_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `role` ENUM ('support', 'admin') NOT NULL
);

CREATE TABLE `support_chat` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `status` ENUM ('new', 'open', 'close'),
  `created_at` datetime
);

CREATE TABLE `support_chat_message` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `support_chat_id` int,
  `user_id` int,
  `admin_user_id` int,
  `message` text,
  `created_at` datetime
);

CREATE TABLE `agencies_address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `agencies_id` int,
  `street_1` varchar(255) NOT NULL,
  `street_2` varchar(255),
  `zipcode` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `lng` decimal,
  `lat` decimal
);

CREATE TABLE `agencies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phone` varchar(255) NOT NULL
);

CREATE TABLE `user_rentals` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `car_id` int,
  `start_location_id` int,
  `end_location_id` int,
  `start_date` datetime,
  `end_date` datetime,
  `car_category` varchar(255),
  `daily_rate` int,
  `guarantee_deposit` int
);

CREATE TABLE `rentals` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `car_id` int,
  `agency_id` int,
  `price_id` int,
  `status` ENUM ('avaliable', 'maintenance', 'removed') NOT NULL
);

CREATE TABLE `rental_prices` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `car_category` varchar(255) NOT NULL,
  `daily_rate` decimal NOT NULL
);

CREATE TABLE `cars` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `photo_url` varchar(255)
);

CREATE TABLE `transactions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `rental_id` int,
  `amount` int NOT NULL,
  `holded_amount` int NOT NULL COMMENT 'Equal guarantee_deposit',
  `transaction_date` datetime NOT NULL,
  `status` ENUM ('pending', 'approved', 'rejected', 'refund')
);

CREATE TABLE `reservations` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `user_rental_id` int,
  `status` ENUM ('pending', 'approved', 'ongoing', 'close')
);

ALTER TABLE `users_address` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `support_chat` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `support_chat_message` ADD FOREIGN KEY (`support_chat_id`) REFERENCES `support_chat` (`id`);

ALTER TABLE `support_chat_message` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `support_chat_message` ADD FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users` (`id`);

ALTER TABLE `agencies_address` ADD FOREIGN KEY (`agencies_id`) REFERENCES `agencies` (`id`);

ALTER TABLE `user_rentals` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_rentals` ADD FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`);

CREATE TABLE `agencies_user_rentals` (
  `agencies_id` int,
  `user_rentals_start_location_id` int,
  PRIMARY KEY (`agencies_id`, `user_rentals_start_location_id`)
);

ALTER TABLE `agencies_user_rentals` ADD FOREIGN KEY (`agencies_id`) REFERENCES `agencies` (`id`);

ALTER TABLE `agencies_user_rentals` ADD FOREIGN KEY (`user_rentals_start_location_id`) REFERENCES `user_rentals` (`start_location_id`);


CREATE TABLE `agencies_user_rentals(1)` (
  `agencies_id` int,
  `user_rentals_end_location_id` int,
  PRIMARY KEY (`agencies_id`, `user_rentals_end_location_id`)
);

ALTER TABLE `agencies_user_rentals(1)` ADD FOREIGN KEY (`agencies_id`) REFERENCES `agencies` (`id`);

ALTER TABLE `agencies_user_rentals(1)` ADD FOREIGN KEY (`user_rentals_end_location_id`) REFERENCES `user_rentals` (`end_location_id`);


ALTER TABLE `rentals` ADD FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`);

ALTER TABLE `rentals` ADD FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`);

ALTER TABLE `rentals` ADD FOREIGN KEY (`price_id`) REFERENCES `rental_prices` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`rental_id`) REFERENCES `rentals` (`id`);

ALTER TABLE `reservations` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reservations` ADD FOREIGN KEY (`user_rental_id`) REFERENCES `user_rentals` (`id`);
