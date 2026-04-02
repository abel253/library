-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2026 at 09:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_circulation_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `log_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `old_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_data`)),
  `new_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `borrow_transactions`
--

CREATE TABLE `borrow_transactions` (
  `transaction_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `fine_amount` decimal(10,2) DEFAULT 0.00,
  `status` varchar(20) DEFAULT 'ISSUED' CHECK (`status` in ('ISSUED','RETURNED','RENEWED','OVERDUE')),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `due_date_config`
--

CREATE TABLE `due_date_config` (
  `due_config_id` int(11) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `default_due_days` int(11) DEFAULT 14,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `due_date_config`
--

INSERT INTO `due_date_config` (`due_config_id`, `user_type`, `default_due_days`, `updated_at`) VALUES
(1, 'Student', 14, '2026-04-01 17:59:41'),
(2, 'Faculty', 30, '2026-04-01 17:59:41'),
(3, 'Librarian', 21, '2026-04-01 17:59:41'),
(4, 'Administrator', 21, '2026-04-01 17:59:41');

-- --------------------------------------------------------

--
-- Table structure for table `fine_config`
--

CREATE TABLE `fine_config` (
  `fine_id` int(11) NOT NULL,
  `item_type` varchar(50) NOT NULL,
  `fine_per_day` decimal(10,2) DEFAULT 1.00,
  `max_fine` decimal(10,2) DEFAULT 50.00,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fine_config`
--

INSERT INTO `fine_config` (`fine_id`, `item_type`, `fine_per_day`, `max_fine`, `updated_at`) VALUES
(1, 'Book', 1.00, 50.00, '2026-04-01 17:59:41'),
(2, 'Magazine', 0.50, 25.00, '2026-04-01 17:59:41'),
(3, 'Journal', 0.50, 25.00, '2026-04-01 17:59:41'),
(4, 'CD', 0.50, 25.00, '2026-04-01 17:59:41'),
(5, 'DVD', 0.50, 25.00, '2026-04-01 17:59:41'),
(6, 'Videocassette', 0.50, 25.00, '2026-04-01 17:59:41');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `author` varchar(500) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `call_number` varchar(50) DEFAULT NULL,
  `publisher` varchar(200) DEFAULT NULL,
  `publication_year` int(11) DEFAULT NULL,
  `edition` varchar(50) DEFAULT NULL,
  `shelf_number` varchar(20) DEFAULT NULL,
  `subject_category` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `available_quantity` int(11) DEFAULT 1,
  `item_type` varchar(50) DEFAULT 'Book' CHECK (`item_type` in ('Book','Magazine','Journal','CD','DVD','Videocassette')),
  `status` varchar(20) DEFAULT 'AVAILABLE' CHECK (`status` in ('AVAILABLE','CHECKED_OUT','RESERVED','MISSING','RENEWED')),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `title`, `author`, `isbn`, `call_number`, `publisher`, `publication_year`, `edition`, `shelf_number`, `subject_category`, `location`, `barcode`, `quantity`, `available_quantity`, `item_type`, `status`, `created_at`) VALUES
(45, 'Introduction to remont sensing', 'Arthur.Cracknel', '0-8493-9255-1', 'c73.A78', NULL, NULL, '2nd', '14G', 'Geography', 'Circulation', '00004075', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(46, 'African Archaeology', 'Cambridge', '0-521-54002-5', 'C101.P39', NULL, 2005, '3rd', '14C', 'Archaeology', 'Circulation', '20070372', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(47, 'Holt McDougal', NULL, '978-0-547-60137-3', 'D209B435', NULL, 2013, NULL, '14G', 'History', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(48, 'The Nature of History', 'ARTHUR MARWICK', '978-0-833-43235-8', 'D13.m32', NULL, 1989, '3rd', '14G', 'History', 'Circulation', '20085904', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(49, 'The Idea Of History', 'R.G.Colling wood', '978-0-19-964129-1', 'D13.C65', NULL, 1994, NULL, '14G', 'History', 'Circulation', '20085689', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(50, 'Politics of origin in Africa', 'Morten Boas', '978-1848-13996-1', 'DT31.K48', NULL, 2013, NULL, '15G', 'Politics', 'Circulation', '20074043', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(51, 'Ahistory of Africa', 'Hosea Jaffe', '978-1-78360-988-8', 'DT31.S23', NULL, 1985, NULL, '15G', 'History', 'Circulation', '20060291', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(52, 'The Ethiopian WarThe Horn of africa', 'Gebru Tareke', '978-99944-951-2-2', 'DT387.95.G43', NULL, 2016, NULL, '15G', 'History', 'Circulation', '20085441', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(53, 'Collision of Empires', 'G.Bruce Strang', '978-1-138-70443-5', 'DT387.8.577', NULL, 2013, NULL, '15G', 'History', 'Circulation', '20080310', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(54, 'The Foreset People', 'Colin TURNBULL', '978-1-84792-380-6', 'DT650.T87', NULL, 1983, NULL, '15G', 'Anthropology', 'Circulation', '20085557', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(55, 'Aloes and Other Lilies of Ethiopia and Eritrea', 'AMERICAN(USA)Sesbeb Demissew', '978-99944-0-042-3', 'E963.S42', NULL, 2010, NULL, '15G', 'Botany', 'Circulation', '20070510', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(56, 'politics of Black Nationalism', 'Prof.Kinfe', '0-86543-155-8', 'E185.61.K52', NULL, 2003, NULL, '15G', 'Politics', 'Circulation', '20074071', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(57, 'DIVERSITY And Society', 'JosephF.Healey', '978-1-412-97647-3', 'E184.H42', NULL, 2010, NULL, '15G', 'Sociology', 'Circulation', '20085517', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(58, 'Asymposium on Ethnic Diversity,violence And', NULL, NULL, 'E303.G6.R43', NULL, 2018, NULL, '15G', 'Sociology', 'Circulation', '20073614', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:41'),
(128, 'Aetxbook of Environmental Studies', 'DR.Vijay Kumar Tiwari', '978-93-5142-554-0', 'GB165.T58', NULL, 2017, NULL, '4G', 'Environmental Science', 'Circulation', '20071268', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(129, 'Elements of Environmental Science', 'Phul Kumar Gaur', '978-81-261-4705-2', 'GB10.G38', NULL, 2017, NULL, '4G', 'Environmental Science', 'Circulation', '20086751', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(130, 'Essentialsof Ecology and Environmental Science', 'S.V.S.Rana', '978-81-203-4786-1', 'GE105.R26', NULL, 2015, '4th', '4G', 'Ecology', 'Circulation', '20072822', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(131, 'Environmental Sciences', 'Kenneth J.Gregory', '978-1-4129-4705-3', 'GB105.G74', NULL, 2009, NULL, '4G', 'Environmental Science', 'Circulation', '20072076', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(132, 'Principlesof Precambrian Geology', 'Alan Mgoodwin', '0-12-289770-6', 'GB653.G66', NULL, 2000, NULL, '4G', 'Geology', 'Circulation', '21022214', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(133, 'Elements of Environmental Science and Engineering', 'P.Meenakshi', '978-81-203-4523-2', 'GE105.M44', NULL, 2012, '2nd', '4G', 'Environmental Science', 'Circulation', '23010003', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(134, 'Environmental Science', 'Dr.Y.K.Singh', '81-224-2330-2', 'GE160.P35', NULL, 2006, NULL, '4G', 'Environmental Science', 'Circulation', '22121451', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(135, 'Environmental Science', 'SC Santra', '978-81-7381-404-4', 'GE160.56', NULL, 2016, NULL, '4G', 'Environmental Science', 'Circulation', '21070087', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(136, 'Environmental Science', 'Edwardi.Newman', '0-632-03657-5', 'GE105.S26', NULL, 1993, NULL, '4G', 'Environmental Science', 'Circulation', '20072079', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(137, 'Applied Ecology', 'Edwardi.Newman', '978-0-632-042625-4', 'GE105.N48', NULL, 1993, '2nd', '4G', 'Ecology', 'Circulation', '20071005', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(138, 'Applied Ecology AND Environmental Management', 'Tim Hall', '978-0-41-3446-3', 'GE105.N48', NULL, 2006, '3rd', '4G', 'Ecology', 'Circulation', '20071006', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(139, 'The macro economy', 'bradley r.schiller', '978-0-07-741647-8', 'HB172.5.S3425', NULL, 2013, NULL, '2G', 'Economics', 'Circulation', '20085720', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(140, 'principles of micro economics', 'n.gregory mankiw', '13,978-0-17-610522-8', 'HB172.J67', NULL, 2008, '4th', '2G', 'Economics', 'Circulation', '20080652', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(141, 'Applied statistics', 'parimal mukhopadhyay', '81-87134-38-0', 'HB29.M84', NULL, 1960, NULL, '2G', 'Statistics', 'Circulation', '20071064', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(142, 'Macro economics', 'n.greory manikw', '1-57259-644-9', 'HB.172.5.m26', NULL, 2000, '4th', '2G', 'Economics', 'Circulation', '20084131', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(143, 'Economics', 'campbell r.mcconnell', '0-07-234036-3', 'HB171.5.m33', NULL, 2002, NULL, '2G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(144, 'Essential economics', 'ayele kuris', NULL, 'HB171.5.m94', NULL, 2019, NULL, '2G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(145, 'Macro economics principles and applications and tools', 'arthur o sullivan', '978-93-325-3660-9', 'HB.172.d85', NULL, 2016, NULL, '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(146, 'Entrepreneurship in agricultural development', 'dipak', '978-93-5124-785-2', 'HB.615.b27', NULL, 2018, NULL, '3G', 'Entrepreneurship', 'Circulation', '20071944', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(147, 'Economics', 'robert e.hall', '13,978-1-4390-3896-3', 'HB.171.5.h34', NULL, 2010, NULL, '3G', 'Economics', 'Circulation', '20086363', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(148, 'Economics', 'davidc. colander', '0-07-254902-5', 'HB.171.1.c65', NULL, 2004, NULL, '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(149, 'Modern microeconomics', 'a.koutsoyiannis', '978-0-333-77821-0', 'HB.172.k68', NULL, 2020, '2nd', '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(150, 'principles of micro economics', 'n.greory manikw', '978-93-86668-29-5', 'HB.172.M36', NULL, 2020, '7th', '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(151, 'Economics', 'paula samuelson', '13,978-007-126383-2', 'HB.171.5.s26', NULL, 2010, NULL, '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(152, 'A text book of mathematical economics', 'chandrakant singh', '978-93-5084-326-0', 'HB.99.s56', NULL, 2014, NULL, '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(153, 'Entrepreneurship development', 'sangeeta sharma', '978-81-203-5270-4', 'HB651.M44', NULL, 2016, NULL, '3G', 'Entrepreneurship', 'Circulation', '20071922', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(154, 'Entrepreneurship FOR Everyone', 'robert mellor', '978-1-4129-4775-6', 'HB.615.m44', NULL, 2009, NULL, '3G', 'Entrepreneurship', 'Circulation', '20083300', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(155, 'Entrepreneurship the way ahead', 'HAROLD.P.WELSH', '0-203-35682-9', 'HB615.W44', NULL, 2004, NULL, '3G', 'Entrepreneurship', 'Circulation', '20080372', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(156, 'Fundamental methods of mathematical economics', 'alphac.chiang', '13,978-0-07-110693-1', 'HB.135.c45', NULL, 2005, '4th', '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(157, 'Macro economics', 'david c.colander', '13,978-93-5260-551-4', 'HB.172.5.c65', NULL, 2013, '9th', '3G', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(158, 'Hand book of agricultural economics', 'brucel.gardner', '0444507280', 'HB.1415.h26', NULL, 2001, NULL, '3G', 'Agricultural Economics', 'Circulation', '20081441', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(159, 'introduction to econometrics', 'g.s.maddala', '978-81-265-3415-9', 'HB.139.m23', NULL, 2009, '4th', '3G', 'Econometrics', 'Circulation', '20083339', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(160, 'Micro economics', 'm.i.hingan', '9788182815629', 'HB.172.44', NULL, 2017, '8th', '3G', 'Economics', 'Circulation', '20084646', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(161, 'International economics', 'thomas.pugel', '0-07-290387-2', 'HF.1411.p84', NULL, 2000, NULL, '4G', 'International Economics', 'Circulation', '20083033', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(162, 'concise history of economics thought', 'b.n.ghosh', '978-93-5202-591-6', 'HB.75.g63', NULL, 1988, NULL, '4G', 'Economics History', 'Circulation', '20081709', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(163, 'International economics', 'D.N Dwivedi', '978-93-259-8923-0', 'HF1359', NULL, 2013, NULL, '4G', 'International Economics', 'Circulation', '21070420', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(164, 'principles of micro economics', 'robert E.hall', '13,978-1-133-18825-4', 'HB172.154', NULL, 2013, NULL, '4G', 'Economics', 'Circulation', '20083553', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(165, 'History of economics thought', 'munish vohra', '81-261-2870-4', 'HB75.V64', NULL, 2006, NULL, '4G', 'Economics History', 'Circulation', '21080097', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(166, 'Basic econometrics', 'damodar n.gujarati', '13,978-0-07-133345-0', 'HB139.g85', NULL, 2019, '5th', '3G', 'Econometrics', 'Circulation', '21070153', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(167, 'Economics For business', 'john sloman', '13,978-1-292-08210-3', 'HB171.5.s56', NULL, 2016, '7th', '3G', 'Business Economics', 'Circulation', '22060889', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(168, 'Business management integrating planning and execution', 'rita lamotta', '978-1-68285-404-4', 'HB1.87.136', NULL, 2018, NULL, '4G', 'Management', 'Circulation', '22060701', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(169, 'Basic electronics engineering', 'irshad ahamad khilji', '978-93-850884-03-4', 'HB139.54', NULL, 1972, NULL, '4G', 'Engineering', 'Circulation', '20071407', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(170, 'Intermediate microeconomics', 'Hal r.varian', '978-8176170657', 'HB 172.w27', NULL, 2010, '8th', '41', 'Economics', 'Circulation', '20028844', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(171, 'A guide to modern econometrics', 'Marno verbeek', '470857730', NULL, NULL, 2004, '2nd', '41', 'Econometrics', 'Circulation', '20070365', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(172, 'Economics today', 'Roger jeroy miller', '978-0312517131', 'HB384.M55', NULL, 2010, '5th', '41', 'Economics', 'Circulation', '25010008', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(173, 'A HISTORY OF ECONOMIC THOUGHT', 'Lionel.robins', '691070148', NULL, NULL, 1998, NULL, '41', 'Economics History', 'Circulation', '20060304', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(174, 'Microeconomics theory and application', 'S.P.S Chauhan', '978-8120336049', 'HB172.C42', NULL, 2009, NULL, '41', 'Economics', 'Circulation', '20084652', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(175, 'Mathematics for economics and business', 'lan jacques', '978-1292191669', 'HB135.133', NULL, 2018, '9th', '41', 'Mathematics', 'Circulation', '25010059', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(176, 'Survey of economics', 'Irvin B.Tucker', '978-1439040546', 'HB171.5.T83', NULL, 2011, '7th', '41', 'Economics', 'Circulation', '25010082', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(177, 'Modern microeconomics theory and application', 'Kumari Veena', '978-9350848784', 'HB 172.V44', NULL, 2016, NULL, '41', 'Economics', 'Circulation', '20084856', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(178, 'Essential mathematics for economic analysis', 'Knut sydsaeter', '978-9352866496', 'HB135.593', NULL, 2019, '5th', '41', 'Mathematics', 'Circulation', '21071805', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(179, 'General economics for a common proficiency test/cpt/', 'DR deepashREE', '978-0-07-065552-2', 'HB 34.D44', NULL, 2007, NULL, '41', 'Economics', 'Circulation', '21072198', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(180, 'econometrics', 'jeffrey m.woidrige', '978-8131509609', 'HB 139.W66', NULL, 2009, NULL, '41', 'Econometrics', 'Circulation', '20086294', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(181, 'microeconomics theory and applications', 'D N Dwivedi', '978-9325986701', 'HB172.D85', NULL, 2016, '3th', '41', 'Economics', 'Circulation', '21070597', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(182, 'Macroeconomic theory', 'T.N.Hajela', '978-8180528226', 'HB172.5.H35', NULL, 2016, '10th', '41', 'Economics', 'Circulation', '21080195', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(183, 'Micro economics', 'Joshua gahs', '978-0170178754', 'HB172.G57', NULL, 2009, '4th', '42', 'Economics', 'Circulation', '20084633', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(184, 'Introduction to econometrics', 'G.S.MADDALS', '978-8126534159', 'HB139.M23', NULL, 2017, '4th', '42', 'Econometrics', 'Circulation', '20083338', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(185, 'survey of economics', 'Ievin b.tucker', '978-1111989668', 'HB 172.5.T83', NULL, 2013, '8th', '42', 'Economics', 'Circulation', '25010103', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(186, 'environmental pollution effects of lead fluoride on animal health', 'D SWARUP', NULL, 'HB846.669', NULL, 2002, NULL, '42', 'Environmental Science', 'Circulation', '20072063', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(187, 'Running regressions', 'M.c.baddley', '978-0521842112', 'HB139.B34', NULL, 2003, NULL, '42', 'Statistics', 'Circulation', '20081937', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(188, 'Economics', 'David colander', '0-25610784', 'HB 171.5.c65', NULL, 1993, NULL, '42', 'Economics', 'Circulation', '21071542', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(189, 'Demography techniques and analysis', 'Asis kumar', '978-8130921181', 'HB871.C43', NULL, 2016, NULL, '42', 'Demography', 'Circulation', '22090587', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(190, 'Macroeconomics principles and applications', 'ROBERT.E HALL', '324072821', 'HB172.5.H25', NULL, 2001, '12th', '42', 'Economics', 'Circulation', '20084147', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(191, 'Macro economic principles and applications', 'Robert e. hall', '978-143907954', 'HB 172.5.H25', NULL, 2011, '4th', '42', 'Economics', 'Circulation', '20084125', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(192, 'Development economics', 'Aparajita Mukherjee', '978-8120305219', 'HB75.M84', NULL, 2016, NULL, '42', 'Development Economics', 'Circulation', '20084130', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(193, 'ECONOMIC theory and operations analysis', 'william j.baumol', '978-8120301412', 'HB 74.B38', NULL, 2014, '4th', '42', 'Economics', 'Circulation', '20086340', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(194, 'Introductory microeconomics and macroeconomics', 'Dr amoop kumar atria', '978-9380311548', 'HB 21.A87', NULL, 2011, NULL, '42', 'Economics', 'Circulation', '20083699', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(195, 'suvey of economics', 'Irvin b. tucker', '324159919', 'HB171.5.T75', NULL, 2004, '4th', '42', 'Economics', 'Circulation', '20084292', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(196, 'microeconomics theory', 'David A.besanka', '978-8126556731', 'HB 172.5.B47', NULL, 2015, '5th', '42', 'Economics', 'Circulation', '20084684', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(197, 'Modern microeconomics', 'A.koutsoyiannis', '978-0333778210', 'HB 172.K68', NULL, 2020, '2th', '42', 'Economics', 'Circulation', '21080016', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(198, 'General economics', 'S.K AGRAWAL', '978-8121928878', 'HB', NULL, 2014, NULL, '42', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(199, 'Principles of economics', NULL, NULL, NULL, NULL, NULL, NULL, '42', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(200, 'The macro economy today', NULL, NULL, NULL, NULL, NULL, NULL, '42', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(201, 'PRINCIPLES of macroeconomics', NULL, NULL, NULL, NULL, NULL, NULL, '42', 'Economics', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(202, 'Economics student workbook and reader', 'JOHN SLOMAN', '978-0273658646', 'HB172.5.M22', NULL, 2002, '5TH', '42', 'Economics', 'Circulation', '20086392', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(203, 'flexible specialization', 'Arni Sverrisson', '1-853392170', 'C435.2.H54', NULL, 1994, NULL, '42', 'Economics', 'Circulation', '20073161', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(204, 'Micro economics volume 1', 'Ayele Kuris', NULL, 'HB 72.5.A94', NULL, 2015, '3rd', '43', 'Economics', 'Circulation', '20084696', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(205, 'Principles of intermediate economics', 'Haile Hagos', NULL, 'HB172.5.H35', NULL, 2015, '3rd', '43', 'Economics', 'Circulation', '20080626', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(206, 'Modern microeconomics', 'A.koutsoyiannis', '033-3397311', 'HB172.K58', NULL, 1987, '2nd', '43', 'Economics', 'Circulation', '20084844', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(207, 'microeconomics volume2', 'Ayele kuris', NULL, 'HB172.A94', NULL, 2016, '2nd', '43', 'Economics', 'Circulation', '20084691', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(208, 'Intermediate environmental economics', 'CHARLES D. COLSTAD', '978-8019809178', 'C79 D34', NULL, 2015, '2ND', '43', 'Environmental Economics', 'Circulation', '20083019', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(209, 'Regional development concepts methodologies tools and application', 'Mehdi khosrow-pour', '978-1466608825', 'C59.72.I55', NULL, 2012, NULL, '43', 'Development', 'Circulation', '20081669', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(210, 'Innovation and entrepreneurship', 'PeterF.Drucker', '978-0061809798', 'C79.D78', NULL, 2010, NULL, '43', 'Entrepreneurship', 'Circulation', '20082655', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(211, 'The political economy of under development', 'S.B.D.de Silva', '0-710202733', 'C7.D35', NULL, 1982, NULL, '43', 'Political Economy', 'Circulation', '20080686', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(212, 'Transition togehren economy in ethiopia', 'Wolday Amha', '978-9994456062', 'C 845.29.W65', NULL, 2017, NULL, '43', 'Economics', 'Circulation', '21071089', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(213, 'Community management of natural resource in africa', 'DILYS ROE', '978-1843697558', 'C800.R63', NULL, 2009, NULL, '43', 'Natural Resources', 'Circulation', '20080707', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(214, 'Natural capital and human economic survival', 'paul Hawken', '15-66703980', 'C 79978', NULL, 1999, '2nd', '43', 'Environmental Economics', 'Circulation', '20085288', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(215, 'planning for the Rural poor', 'Seema Jha', '978-93-89387360', 'C 440.P6.J43', NULL, 2019, NULL, '43', 'Rural Development', 'Circulation', '22110662', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(216, 'An introduction to sustainable development', 'Bryce Carroll', '978-1635492705', 'C79.E5.L58', NULL, 2017, NULL, '43', 'Sustainable Development', 'Circulation', '21071707', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(217, 'Integrated natural resource management', 'Laura German', '978-0415697361', 'C840168', NULL, 2012, NULL, '43', 'Natural Resources', 'Circulation', '20082764', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(218, 'Rural Development and agricultural extension', 'Mengistie birhanu', '978-6200294934', 'C 502.M44', NULL, 2019, NULL, '43', 'Rural Development', 'Circulation', '23031578', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(219, 'Handbook on the economics natural resource s', 'Robert Halvorsen', '978-1784715205', 'C 85.H26', NULL, 2016, NULL, '43', 'Natural Resource Economics', 'Circulation', '20081746', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(220, 'THE ETHIOPIAN ECONOMY', 'Fantu Cheru', '978-0198814986', 'C 845.F36', NULL, 2019, NULL, '43', 'Economics', 'Circulation', '21070047', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(221, 'PRINCIPLES of cost -benefit analysis for developing countries', 'CAROLINE DINWIDDY', '05-21473586', 'C59.7.D527', NULL, 1996, NULL, '43', 'Development Economics', 'Circulation', '20080502', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(222, 'challenges and opportunities for inclusive development inethiopia', 'Dessalegn Rahmeto', '978-9994450671', 'C 845.P34', NULL, 2018, NULL, '43', 'Development', 'Circulation', '21070459', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(223, 'EnvironmentS and livelihoods', 'KOOS Neefjes', '0855-984406', 'C 79.44', NULL, 2000, NULL, '43', 'Environment', 'Circulation', '20072368', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(224, 'Encyclopedia of entrepreneurs', 'Anthony', '04-71175366', 'C102.5.H34', NULL, 1997, NULL, '43', 'Entrepreneurship', 'Circulation', '20087623', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(225, 'ECONOMIC DEVELOPMENT', 'MICHAEL P.TODARO', '978-1-292-29115-4', 'D82.T63', NULL, 2020, '13th', '5', 'Development Economics', 'Circulation', '22060850', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(226, 'watershed management', 'm.c.oswal', '978-81-85211-44-2', 'D16.95.O89', NULL, 2018, NULL, '51', 'Water Management', 'Circulation', '21070995', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(227, 'supply chain management', 'lawrence D.fredendall ed hill', '1-57444-12-5', 'D38.5.F74', NULL, 2001, NULL, '51', 'Supply Chain', 'Circulation', '25010032', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(228, 'human trafficking', 'Michael Hugos', '978-9305307064', 'D281.C43', NULL, 2016, NULL, '51', 'Social Issues', 'Circulation', '21071876', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(229, 'Essentials of supply chain management', 'tayo fashoyin', '978-0-470942105', 'D38.5.H84', NULL, 2011, '3th', '5', 'Supply Chain', 'Circulation', '25010011', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(230, 'labour management cooperation in SMEs', 'k.s.GANGADHAR', '978-92-2-117413-4', 'D62.7.F37', NULL, 2006, NULL, '51', 'Management', 'Circulation', '21070833', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(231, 'LIVE Stock Economics', 'M.L.Choudhary', '978-9383305858', 'D 9410.5.G36', NULL, 2015, NULL, '51', 'Agricultural Economics', 'Circulation', '22110261', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(232, 'Family farming and rural economic development', 'Robert D.HISRICH', '978-0078112843', 'D176.L46', NULL, 2017, '10th', '5', 'Rural Development', 'Circulation', '22110682', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(233, 'Giz ethiopia', 'sanjay chhabra', '978-9352023165', 'D156.G49', NULL, 2017, NULL, '51', 'Development', 'Circulation', '20074582', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(234, 'Entrepreneurship', 'vidya hattangadui', '978-9352029570', 'D62.5.H57', NULL, 2016, NULL, '51', 'Entrepreneurship', 'Circulation', '20088008', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(235, 'Fundamental of entrepreneurship', 'werotaw bezabeb', '978-99944-908-3-7', 'D60.C43', NULL, 2015, NULL, '51', 'Entrepreneurship', 'Circulation', '20060104', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(236, 'Entrepreneurship need of the hour', 'hailay gebretinsae', NULL, 'D60.5.H37', NULL, 2007, '2th', '51', 'Entrepreneurship', 'Circulation', '20088033', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(237, 'Entrepreneurship', 'Dr.R.A.S Tomar', '978-81-8329-616-8', 'D62.5.H5.W47', NULL, 2013, NULL, '51', 'Entrepreneurship', 'Circulation', '27070859', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(238, 'Entrepreneurship and small business management', 'Richard Morse', '1-85339-290-1', 'D62.7.H35', NULL, 1995, NULL, '51', 'Entrepreneurship', 'Circulation', '20088020', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(239, 'Agricultural science and technology', 'G.faure', '978-94-6022-345-7', 'D9017.S73', NULL, 2014, NULL, '51', 'Agriculture', 'Circulation', '20070472', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(240, 'GRASSROOT HORIZONS', 'Heinrich wohlmeyer', '1874-7194-54', 'D1332.G73', NULL, 2002, NULL, '51', 'Development', 'Circulation', '20080007', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(241, 'Innovating with rural stakeholders in the developing world', 'Michael williams', '81-242-0403-9', 'D45.1.66', NULL, 2004, '1th', '5', 'Rural Development', 'Circulation', '20082656', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(242, 'the wet Agriculture and sustainable development', 'Dr.Anil Dhawan', '978-93-81348-30-7', 'D9000.6.W76', NULL, 2011, NULL, '51', 'Agriculture', 'Circulation', '20086317', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(243, 'MANAGEMENT SKILLS', 'CYNTHIA FRASER', '978-0-3567-5226-6', 'D31.W55', NULL, 2009, NULL, '52', 'Management', 'Circulation', '22060636', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(244, 'Business Organisation', 'Nirmal chandra pradhan', '978-81-261-3582-0', 'D31.O79.D43', NULL, 2008, NULL, '52', 'Business', 'Circulation', '22060642', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(245, 'Business Strategies and management', 'steven M.Bragg', '978-0-471-77156-2', 'D60.F73', NULL, 2006, '2th', '5', 'Business', 'Circulation', '22060643', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(246, 'BASICS OF ECOLOGY', 'A.C.Broadway', '978-81-272-0583-4', 'D30.28.I52', NULL, 2002, '1th', '5', 'Ecology', 'Circulation', '20071495', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(247, 'Accounting and finance for your small business', 'julie stewart', NULL, 'D31.B73', NULL, 2014, NULL, '52', 'Accounting', 'Circulation', '21072172', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(248, 'Business research project', 'James P.lewis', '978-0-8144-0879-7', 'D30.4.K45', NULL, 2007, '3th', '5', 'Research', 'Circulation', '20072887', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(249, 'AGRI Business Management', 'Dess.Lumpkin', '978-0-07-763608-1', 'D9475.B76', NULL, 2014, '7th', '5', 'Agribusiness', 'Circulation', '20060354', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(250, 'Gender Agriculture and Natural Resources', 'Malcolm Goodman', '978-0-415-66355-7', 'D 6077.2.F44', NULL, 2013, NULL, '52', 'Gender Studies', 'Circulation', '20074459', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(251, 'Fundamental of project management', 'veronica Cinti', '978-1-68095-703-7', 'D 69 L49', NULL, 2017, NULL, '52', 'Project Management', 'Circulation', '20073983', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(252, 'Strategic management', NULL, '978-0-8213-7432-0', 'D 30.28.D47', NULL, 2008, NULL, '52', 'Management', 'Circulation', '20083496', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(253, 'Creativity and Strategic Innovation Management', 'Raymond A.T.George', '978-1-84593-819-2', 'D 53.G66', NULL, 2011, NULL, '52', 'Innovation', 'Circulation', '20083042', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(254, 'Public Relations strategy', 'Kjeld Schmidt', '978-1-84800-067-4', 'D59.P83', NULL, 2011, NULL, '52', 'Public Relations', 'Circulation', '22120146', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(255, 'Sustainable Land Management', 'Gudrun kochendorfer-lucius', '978-0-8213-7127-5', 'D2073.A37', NULL, 2008, NULL, '52', 'Land Management', 'Circulation', '20070475', 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42'),
(256, 'Agricultural seed production', 'J.R.Deep ford', '978-92-5-105747-6', NULL, NULL, 2007, NULL, '52', 'Agriculture', 'Circulation', NULL, 1, 1, 'Book', 'AVAILABLE', '2026-04-01 17:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `overdue_items`
--

CREATE TABLE `overdue_items` (
  `overdue_id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `days_overdue` int(11) DEFAULT NULL,
  `fine_amount` decimal(10,2) DEFAULT NULL,
  `email_sent` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `report_type` varchar(50) NOT NULL,
  `generated_by` varchar(20) DEFAULT NULL,
  `generated_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `parameters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parameters`)),
  `file_path` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `reservation_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `status` varchar(20) DEFAULT 'PENDING' CHECK (`status` in ('PENDING','FULFILLED','EXPIRED','CANCELLED')),
  `queue_position` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_config`
--

CREATE TABLE `system_config` (
  `config_id` int(11) NOT NULL,
  `config_key` varchar(50) NOT NULL,
  `config_value` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_config`
--

INSERT INTO `system_config` (`config_id`, `config_key`, `config_value`, `description`, `updated_at`) VALUES
(1, 'default_due_days', '14', 'Default number of days for checkout', '2026-04-01 17:59:41'),
(2, 'max_items_per_student', '5', 'Maximum items a student can borrow', '2026-04-01 17:59:41'),
(3, 'max_items_per_faculty', '10', 'Maximum items a faculty can borrow', '2026-04-01 17:59:41'),
(4, 'max_renewals', '2', 'Maximum number of renewals allowed', '2026-04-01 17:59:41'),
(5, 'reservation_expiry_days', '3', 'Days to pick up reserved item', '2026-04-01 17:59:41'),
(6, 'email_notifications', 'true', 'Enable email notifications for overdue items', '2026-04-01 17:59:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_type` varchar(20) NOT NULL CHECK (`user_type` in ('Student','Faculty','Librarian','Administrator')),
  `department` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ABLE_TO_BORROW' CHECK (`status` in ('ABLE_TO_BORROW','UNABLE_TO_BORROW','BLOCKED')),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password_hash`, `name`, `email`, `user_type`, `department`, `status`, `created_at`, `email_verified`) VALUES
('A001', '$2a$10$samplehash7', 'Admin User', 'admin@library.edu', 'Administrator', 'Administration', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1),
('F001', '$2a$10$samplehash4', 'Dr. Smith', 'smith@university.edu', 'Faculty', 'Physics', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1),
('F002', '$2a$10$samplehash5', 'Dr. Johnson', 'dr.johnson@university.edu', 'Faculty', 'Chemistry', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1),
('L001', '$2a$10$samplehash6', 'Jane Librarian', 'jane@library.edu', 'Librarian', 'Library Services', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1),
('S001', '$2a$10$samplehash1', 'John Student', 'student1@university.edu', 'Student', 'Computer Science', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1),
('S002', '$2a$10$samplehash2', 'Alice Johnson', 'alice@university.edu', 'Student', 'Mathematics', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1),
('S003', '$2a$10$samplehash3', 'Bob Williams', 'bob@university.edu', 'Student', 'Physics', 'ABLE_TO_BORROW', '2026-04-01 17:59:41', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_overdue_items`
-- (See below for the actual view)
--
CREATE TABLE `vw_overdue_items` (
`transaction_id` int(11)
,`borrower_name` varchar(100)
,`borrower_email` varchar(100)
,`item_title` varchar(500)
,`call_number` varchar(50)
,`issue_date` date
,`due_date` date
,`days_overdue` int(7)
,`fine_amount` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_user_borrowing_history`
-- (See below for the actual view)
--
CREATE TABLE `vw_user_borrowing_history` (
`transaction_id` int(11)
,`user_id` varchar(20)
,`user_name` varchar(100)
,`user_type` varchar(20)
,`item_title` varchar(500)
,`author` varchar(500)
,`issue_date` date
,`due_date` date
,`return_date` date
,`fine_amount` decimal(10,2)
,`status` varchar(20)
);

-- --------------------------------------------------------

--
-- Structure for view `vw_overdue_items`
--
DROP TABLE IF EXISTS `vw_overdue_items`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_overdue_items`  AS SELECT `bt`.`transaction_id` AS `transaction_id`, `u`.`name` AS `borrower_name`, `u`.`email` AS `borrower_email`, `i`.`title` AS `item_title`, `i`.`call_number` AS `call_number`, `bt`.`issue_date` AS `issue_date`, `bt`.`due_date` AS `due_date`, to_days(curdate()) - to_days(`bt`.`due_date`) AS `days_overdue`, `bt`.`fine_amount` AS `fine_amount` FROM ((`borrow_transactions` `bt` join `users` `u` on(`bt`.`user_id` = `u`.`user_id`)) join `items` `i` on(`bt`.`item_id` = `i`.`item_id`)) WHERE `bt`.`return_date` is null AND `bt`.`due_date` < curdate() ;

-- --------------------------------------------------------

--
-- Structure for view `vw_user_borrowing_history`
--
DROP TABLE IF EXISTS `vw_user_borrowing_history`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_user_borrowing_history`  AS SELECT `bt`.`transaction_id` AS `transaction_id`, `u`.`user_id` AS `user_id`, `u`.`name` AS `user_name`, `u`.`user_type` AS `user_type`, `i`.`title` AS `item_title`, `i`.`author` AS `author`, `bt`.`issue_date` AS `issue_date`, `bt`.`due_date` AS `due_date`, `bt`.`return_date` AS `return_date`, `bt`.`fine_amount` AS `fine_amount`, `bt`.`status` AS `status` FROM ((`borrow_transactions` `bt` join `users` `u` on(`bt`.`user_id` = `u`.`user_id`)) join `items` `i` on(`bt`.`item_id` = `i`.`item_id`)) ORDER BY `bt`.`issue_date` DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `borrow_transactions`
--
ALTER TABLE `borrow_transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `idx_transactions_user_id` (`user_id`),
  ADD KEY `idx_transactions_item_id` (`item_id`),
  ADD KEY `idx_transactions_status` (`status`),
  ADD KEY `idx_transactions_issue_date` (`issue_date`),
  ADD KEY `idx_transactions_due_date` (`due_date`);

--
-- Indexes for table `due_date_config`
--
ALTER TABLE `due_date_config`
  ADD PRIMARY KEY (`due_config_id`);

--
-- Indexes for table `fine_config`
--
ALTER TABLE `fine_config`
  ADD PRIMARY KEY (`fine_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `barcode` (`barcode`),
  ADD KEY `idx_items_title` (`title`(100)),
  ADD KEY `idx_items_author` (`author`(100)),
  ADD KEY `idx_items_isbn` (`isbn`),
  ADD KEY `idx_items_call_number` (`call_number`),
  ADD KEY `idx_items_status` (`status`),
  ADD KEY `idx_items_subject_category` (`subject_category`);

--
-- Indexes for table `overdue_items`
--
ALTER TABLE `overdue_items`
  ADD PRIMARY KEY (`overdue_id`),
  ADD KEY `idx_overdue_transaction_id` (`transaction_id`),
  ADD KEY `idx_overdue_email_sent` (`email_sent`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `generated_by` (`generated_by`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `idx_reservations_user_id` (`user_id`),
  ADD KEY `idx_reservations_item_id` (`item_id`),
  ADD KEY `idx_reservations_status` (`status`);

--
-- Indexes for table `system_config`
--
ALTER TABLE `system_config`
  ADD PRIMARY KEY (`config_id`),
  ADD UNIQUE KEY `config_key` (`config_key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `borrow_transactions`
--
ALTER TABLE `borrow_transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `due_date_config`
--
ALTER TABLE `due_date_config`
  MODIFY `due_config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fine_config`
--
ALTER TABLE `fine_config`
  MODIFY `fine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=530;

--
-- AUTO_INCREMENT for table `overdue_items`
--
ALTER TABLE `overdue_items`
  MODIFY `overdue_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_config`
--
ALTER TABLE `system_config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `borrow_transactions`
--
ALTER TABLE `borrow_transactions`
  ADD CONSTRAINT `borrow_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `borrow_transactions_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

--
-- Constraints for table `overdue_items`
--
ALTER TABLE `overdue_items`
  ADD CONSTRAINT `overdue_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `borrow_transactions` (`transaction_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`generated_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
