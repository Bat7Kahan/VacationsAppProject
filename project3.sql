-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2021 at 11:19 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3`
--

-- --------------------------------------------------------

--
-- Table structure for table `followes`
--

CREATE TABLE `followes` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followes`
--

INSERT INTO `followes` (`user_id`, `vacation_id`) VALUES
(29, 76),
(29, 82),
(29, 85),
(30, 80),
(30, 84),
(30, 85),
(31, 77),
(32, 84),
(33, 80),
(33, 82),
(33, 84),
(35, 85),
(36, 79),
(36, 85),
(37, 78),
(37, 80),
(37, 84),
(37, 85),
(38, 80),
(38, 81),
(38, 82),
(39, 76),
(40, 82),
(40, 85);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` enum('User','Admin','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `first_name`, `last_name`, `username`, `password`, `role`) VALUES
(27, 'Batsheva', 'Kahan', 'Batsheva123', '123456', 'Admin'),
(29, 'Emanuel', 'Cohen', 'Emanuel123', '123456', 'User'),
(30, 'Israel', 'Israeli', 'Israel1', '123456', 'User'),
(31, 'Miri', 'Michaeli', 'Miri1', '123456', 'User'),
(32, 'Gilad', 'Simchon', 'Gilad1', '123456', 'User'),
(33, 'Michal', 'Cohen', 'Michal123', '123456', 'User'),
(34, 'Michal', 'Kinari', 'Michali123', '123456', 'User'),
(35, 'Avigail', 'Weisberg', 'Avigail123', '123456', 'User'),
(36, 'Abby', 'Abbali', 'Abby123', '123456', 'User'),
(37, 'Rachel', 'Rachel', 'Rachel123', '123456', 'User'),
(38, 'Rivki', 'Weisberg', 'Rivki123', '123456', 'User'),
(39, 'Smith', 'Smith', 'Smith123', '123456', 'User'),
(40, 'Neomi', 'Halevi', 'Neomi123', '123456', 'User'),
(41, 'Neomi ', 'Kahana', 'Neomi1234', '123456', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `ID` int(11) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `destination` varchar(300) NOT NULL,
  `image` varchar(300) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`ID`, `description`, `destination`, `image`, `start_date`, `end_date`, `price`) VALUES
(76, 'Vacation in Jerusalem', 'Jerusalem, Israel', 'Jerusalem.jpg', '2021-10-04', '2021-10-27', 6000),
(77, 'Vacation in San-Francisco', 'San Francisco ,USA', 'sanFranciscojpg.jpg', '2021-10-13', '2021-10-31', 6000),
(78, 'Vacation in London', 'London, Great Britain ', 'London.jpg', '2021-10-14', '2021-10-26', 500),
(79, 'Vacation in the Netherlands', 'Netherlands, Holand', 'Netherlands.jpg', '2021-10-14', '2021-10-25', 5002),
(80, 'Vacation in Paris', 'Paris, France', 'Paris.jpg', '2021-10-13', '2021-10-31', 8080),
(81, 'Vacation in Rome', 'Rome, Italy', 'Rome.jpg', '2021-10-21', '2021-10-25', 400),
(82, 'Vacation in Prague', 'Prague', 'Prague.jpg', '2021-10-21', '2021-10-24', 200),
(84, 'Vacation in Tel-Aviv', 'Tel-Aviv, Israel', 'Tel-Aviv.jpg', '2021-10-06', '2021-10-27', 1500),
(85, 'Vacation in Eilat', 'Eilat, Israel', 'Eilat.jpg', '2021-10-20', '2021-10-31', 700),
(86, 'Vacation in Miami', 'Miami, USA', 'Miami.jpg', '2021-10-08', '2021-10-14', 5005),
(94, 'Vacation in Cypres', 'Cypres', 'Cypres.jpg', '2021-10-08', '2021-10-27', 600);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followes`
--
ALTER TABLE `followes`
  ADD UNIQUE KEY `uq_followes` (`user_id`,`vacation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followes`
--
ALTER TABLE `followes`
  ADD CONSTRAINT `followes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
