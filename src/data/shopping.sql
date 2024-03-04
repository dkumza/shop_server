-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 04, 2024 at 12:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Computers'),
(2, 'Phones');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(1, 'Akmenės r'),
(2, 'Alytus'),
(3, 'Alytaus r'),
(4, 'Anykščių r'),
(5, 'Birštonas'),
(6, 'Biržų r'),
(7, 'Druskininkai'),
(8, 'Elektrėnai'),
(9, 'Ignalina'),
(10, 'Jonavos r'),
(11, 'Joniškio r'),
(12, 'Jurbarko r'),
(13, 'Kaišiadorių r'),
(14, 'Kalvarija'),
(15, 'Kaunas'),
(16, 'Kauno r'),
(17, 'Kazlų Rūda'),
(18, 'Kėdainių r'),
(19, 'Kelmės r'),
(20, 'Klaipėda'),
(21, 'Klaipėdos r'),
(22, 'Kretingos r'),
(23, 'Kupiškio r'),
(24, 'Lazdijų r'),
(25, 'Marijampolė'),
(26, 'Mažeikių r'),
(27, 'Molėtų r'),
(28, 'Neringa'),
(29, 'Pagėgiai'),
(30, 'Pakruojo r'),
(31, 'Palanga'),
(32, 'Panevėžys'),
(33, 'Panevėžio r'),
(34, 'Pasvalio r'),
(35, 'Plungės r'),
(36, 'Prienų r'),
(37, 'Radviliškio r'),
(38, 'Raseinių r'),
(39, 'Rietavas'),
(40, 'Rokiškio r'),
(41, 'Skuodo r'),
(42, 'Šakių r'),
(43, 'Šalčininkų r'),
(44, 'Šiauliai'),
(45, 'Šiaulių r'),
(46, 'Šilalės r'),
(47, 'Šilutės r'),
(48, 'Širvintų r'),
(49, 'Švenčionių r'),
(50, 'Tauragės r'),
(51, 'Telšių r'),
(52, 'Trakų r'),
(53, 'Ukmergės r'),
(54, 'Utenos r'),
(55, 'Varėnos r'),
(56, 'Vilkaviškio r'),
(57, 'Vilnius'),
(58, 'Vilniaus r'),
(59, 'Visaginas'),
(60, 'Zarasų r');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) NOT NULL,
  `productID` int(10) UNSIGNED DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `productID`, `content`, `userID`, `created`) VALUES
(6, 1, 'mano commentas', 21, '2024-02-27 18:46:12'),
(9, 2, 'cia irgi pakomentinau', 1, '2024-02-27 19:44:32');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`user_id`, `product_id`) VALUES
(21, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `cat_id` int(10) UNSIGNED NOT NULL,
  `sub_id` int(10) UNSIGNED NOT NULL,
  `img_urls` varchar(2000) DEFAULT NULL,
  `city` int(10) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDeleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `cat_id`, `sub_id`, `img_urls`, `city`, `user_id`, `created`, `updated`, `isDeleted`) VALUES
(1, 'Good Title 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae illum consequatur error dolorum iure minus! Ipsam id, quidem illum ea numquam, nisi fuga laborum minus facilis accusantium quia, culpa laboriosam!', 600.00, 1, 2, '[\"uploads/products/2024_02_25_11_48_38_576642a1-d070-487e-945d-17e566c9eff1/up_2024_02_25_11_48_38_james_wheeler_ZOA_cqKuJAA_unsplash_9f9a08c5-b8e1-4717-99fb-53420a75f567.jpg\",\"uploads/products/2024_02_25_11_48_38_576642a1-d070-487e-945d-17e566c9eff1/up_2024_02_25_11_48_38_adam_kool_ndN00KmbJ1c_unsplash_d2b177ad-032c-4918-926b-685fd5819ab2.jpg\"]', 4, 1, '2024-02-25 09:38:51', '2024-03-01 16:28:55', 1),
(2, 'Good Title 2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae illum consequatur error dolorum iure minus! Ipsam id, quidem illum ea numquam, nisi fuga laborum minus facilis accusantium quia, culpa laboriosam!', 400.00, 2, 8, '[\"uploads/products/2024_02_25_19_00_04_21a56ce1-a3bc-4c7d-aca6-fe087ea7b795/up_2024_02_25_19_00_04_james_wheeler_ZOA_cqKuJAA_unsplash_5a4652a0-d54c-4feb-b23d-1a0095f936e7.jpg\"]', 14, 21, '2024-02-25 11:34:57', '2024-03-01 09:01:34', 0),
(3, 'Good Title 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae illum consequatur error dolorum iure minus! Ipsam id, quidem illum ea numquam, nisi fuga laborum minus facilis accusantium quia, culpa laboriosam!', 400.00, 1, 3, '[\"uploads/products/2024_02_25_13_54_06_04ecefaa-d213-4394-93ad-a3530fbe1d74/up_2024_02_25_13_54_06_adam_kool_ndN00KmbJ1c_unsplash_65fcb30c-2528-41cf-b5aa-3d4da29265f6.jpg\"]', 12, 21, '2024-02-25 11:53:41', '2024-02-25 11:54:06', 0),
(4, 'Good Title 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae illum consequatur error dolorum iure minus! Ipsam id, quidem illum ea numquam, nisi fuga laborum minus facilis accusantium quia, culpa laboriosam!', 400.00, 2, 7, '[]', 16, 21, '2024-03-02 12:23:39', '2024-03-02 12:23:39', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `parent_id`, `name`) VALUES
(1, 1, 'Desktop PCs'),
(2, 1, 'Laptops'),
(3, 1, 'Desktop Parts'),
(4, 1, 'Laptop Parts'),
(5, 1, 'Other'),
(6, 2, 'Android Phones'),
(7, 2, 'Apple Phones'),
(8, 2, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `telephone`, `password`, `created_at`) VALUES
(1, 'admin', 'admin@admin.qq', 866666, '$2a$10$ksV/nPSzLdIth8utpsGa9OGQBrJykyGNWbZBI40bXJ3xHfhKPbW4G', '2024-02-05 17:49:05'),
(10, 'savikas', 'mike1@bond.com', 8633333, '$2a$10$ByeGaMq/DFU.DQQXW6lMS.0f1uG4NOKWBf4BU89g.2xz.GUA9ORhC', '2024-02-05 17:52:14'),
(21, 'Darius', 'darius@darius.lt', 666776666, '$2a$10$s9iw2umT3T8693Jus8jDKeO735JCYF6ZBDbA6jHs.S2PvCRXXvfhe', '2024-02-18 15:13:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`product_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city` (`city`),
  ADD KEY `id_2` (`id`),
  ADD KEY `idx_pr` (`title`(50),`description`(50)),
  ADD KEY `cat_id` (`cat_id`),
  ADD KEY `sub_id` (`sub_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telephone` (`telephone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sub_id`) REFERENCES `sub_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
