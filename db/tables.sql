START TRANSACTION;

CREATE TABLE IF NOT EXISTS `users` (
    `email` VARCHAR(100),
    `name` VARCHAR(50) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `rooms` (
    `name` VARCHAR(100),
    `manager` VARCHAR(100),
    PRIMARY KEY (`name`),
    CONSTRAINT `room_manager` FOREIGN KEY (`manager`) REFERENCES `users`(`email`)
);

CREATE TABLE IF NOT EXISTS `timeslots` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    `room` VARCHAR(100),
    `from` TIME NOT NULL,
    `to` TIME NOT NULL,
    `weekday` TINYINT NOT NULL,
    CHECK (`weekday` >= 0 AND `weekday` <= 6),
    PRIMARY KEY (`id`, `room`),
    CONSTRAINT `room_timeslot` FOREIGN KEY (`room`) REFERENCES `rooms`(`name`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `inspection_times` (
    `time` TIME,
    `timeslot_id` INT UNSIGNED,
    `room` VARCHAR(100),
    PRIMARY KEY (`time`, `timeslot_id`, `room`),
    CONSTRAINT `inspection_time_timeslot` FOREIGN KEY (`timeslot_id`, `room`) REFERENCES `timeslots`(`id`, `room`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `reservations` (
    `date` DATE,
    `timeslot_id` INT UNSIGNED,
    `room` VARCHAR(100),
    `inspection_time` TIME,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `cid` VARCHAR(10) NOT NULL,
    `society` VARCHAR(50),
    `event` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`date`, `timeslot_id`, `room`),
    CONSTRAINT `reservation_timeslot` FOREIGN KEY (`timeslot_id`, `room`) REFERENCES `timeslots`(`id`, `room`) ON DELETE CASCADE,
    CONSTRAINT `reservation_inspection_time` FOREIGN KEY (`inspection_time`, `timeslot_id`, `room`) REFERENCES `inspection_times`(`time`, `timeslot_id`, `room`)
);

COMMIT;