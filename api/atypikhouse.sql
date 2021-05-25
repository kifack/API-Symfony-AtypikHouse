-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 21 oct. 2020 à 07:44
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `atypikhouse`
--

-- --------------------------------------------------------

--
-- Structure de la table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `distance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double DEFAULT 0,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `activity`
--

INSERT INTO `activity` (`id`, `location_id`, `user_id`, `description`, `distance`, `price`, `created_at`) VALUES
(1, 1, 1, 'Nouvelle activité', '3000', 200, '2020-09-01 20:44:59');

-- --------------------------------------------------------

--
-- Structure de la table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `number_person` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `file_name`, `created_at`, `author_id`) VALUES
(1, 'Cabane dans l\'air', 'De belles cabanes', 'sunrise-4.jpeg', '2020-08-31 22:57:27', 1),
(2, 'Cabanes sur l\'eau', 'De belles cabanes', 'sunset-0.jpeg', '2020-08-31 23:32:32', 1),
(3, 'Les cabanes dans l\'air', 'Les Cabanes', '5f4e1abad9be0225289123.jpg', '2020-09-01 11:56:10', 1),
(4, 'Tente et tente lodge', 'La tente n\'est pas que synonyme d\'incommodité. Elle se veut également luxe et confort, c\'est aussi ça l\'insolite !', '5f7980ecaa6b4775973351.jpg', '2020-10-04 09:59:40', 1);

-- --------------------------------------------------------

--
-- Structure de la table `choice_item`
--

CREATE TABLE `choice_item` (
  `id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value_item` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `choice_item`
--

INSERT INTO `choice_item` (`id`, `field_id`, `label`, `value_item`) VALUES
(1, 2, 'Eclectrique', '0'),
(2, 2, 'Gaz', '1'),
(3, 3, 'Enfant', 'enfant'),
(4, 3, 'Adulte', 'adulte'),
(5, 3, 'Vieux', 'vieux');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `locations_id` int(11) DEFAULT NULL,
  `activities_id` int(11) DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `author_id`, `locations_id`, `activities_id`, `content`, `date_created`, `date_modified`, `status`) VALUES
(1, 3, 10, NULL, 'Une belle Bulle.Je l\'ai vraiment aimé', '2020-10-19 20:12:38', '2020-10-19 20:12:38', 1),
(2, 3, 10, 1, 'Une belle Bulle.Je l\'ai vraiment aimé', '2020-10-19 20:12:38', '2020-10-19 20:12:38', 1);

-- --------------------------------------------------------

--
-- Structure de la table `destination`
--

CREATE TABLE `destination` (
  `id` int(11) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `destination`
--

INSERT INTO `destination` (`id`, `address`, `description`, `file_name`, `created_at`, `author_id`) VALUES
(1, '7 rue de pa Phyte', 'De belles cabanes', 'Eiffel Tower_GettyImages.jpg', '2020-08-31 23:31:23', 1),
(2, 'Paris', 'Des vacances a 400 metre de Paris', '5f4e1b1cc268a409823338.jpg', '2020-09-01 11:57:48', 1),
(3, 'Ville de Anger', 'Un Weekend à Anger', '5f795b9e0b786414018728.jpg', '2020-10-04 07:20:30', 1),
(4, 'Lille', 'Un Weekend à Lille', '5f797e2c03292606398948.jpg', '2020-10-04 09:47:56', 1),
(5, 'Paris', 'Destination de reve', '5f7b99138ff95326738102.jpg', '2020-10-06 00:07:15', 1);

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20200831204544', '2020-08-31 22:47:28', 1278),
('DoctrineMigrations\\Version20200831211308', '2020-08-31 23:13:20', 162),
('DoctrineMigrations\\Version20200831213102', '2020-08-31 23:31:11', 116),
('DoctrineMigrations\\Version20200901094731', '2020-09-01 11:47:44', 437),
('DoctrineMigrations\\Version20200901183453', '2020-09-01 20:35:06', 146),
('DoctrineMigrations\\Version20200901184431', '2020-09-01 20:44:43', 117),
('DoctrineMigrations\\Version20200905134418', '2020-09-05 15:44:37', 438);

-- --------------------------------------------------------

--
-- Structure de la table `field`
--

CREATE TABLE `field` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `field`
--

INSERT INTO `field` (`id`, `category_id`, `name`, `label`, `type_name`) VALUES
(1, 1, 'surface', 'Etendu du logement', 'number'),
(2, 1, 'heat', 'Type de chauffage', 'select'),
(3, 1, 'game', 'Type de jeux', 'select');

-- --------------------------------------------------------

--
-- Structure de la table `field_value`
--

CREATE TABLE `field_value` (
  `id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `field_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `field_value`
--

INSERT INTO `field_value` (`id`, `field_id`, `location_id`, `field_value`) VALUES
(1, 1, 6, '22'),
(2, 2, 6, '0'),
(3, 3, 6, 'adulte'),
(4, 1, 7, '15'),
(5, 2, 7, 'Electrique'),
(6, 3, 7, 'adulte'),
(7, 1, 10, '22'),
(8, 2, 10, 'Gaz'),
(9, 3, 10, 'adulte');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `location_id`, `file_name`, `created_at`, `description`) VALUES
(1, 2, '5f4e51e50e99e368822646.jpg', '2020-09-01 15:51:33', 'In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since. \'Whenever you feel like criticizing anyone,\' he told me, \'just remember that all the people in this world haven\'t had the advantages t'),
(2, 3, '5f4e522f8fd22135688530.jpg', '2020-09-01 15:52:47', 'Description'),
(3, 3, '5f4e522f91118044004267.jpg', '2020-09-01 15:52:47', 'Description'),
(4, 4, '5f4e531f3a3ae387516695.jpg', '2020-09-01 15:56:47', 'Description'),
(5, 4, '5f4e531f3bb43666638553.jpg', '2020-09-01 15:56:47', 'Description'),
(6, 5, '5f539fb5ecccf691065952.jpg', '2020-09-05 16:24:53', 'Description'),
(7, 5, '5f539fb5f03c7067250473.jpg', '2020-09-05 16:24:53', 'Description'),
(8, 1, '5f795c988d0e7175626448.jpg', '0000-00-00 00:00:00', 'Description'),
(9, 1, '5f795c988d0e7175626448.jpg', '0000-00-00 00:00:00', 'Description'),
(10, 7, '5f795c988d0e7175626448.jpg', '2020-10-14 13:56:28', 'sdvsvsvs'),
(11, 10, '5f88390e8ef39979947979.jpg', '2020-10-15 13:57:02', 'Description'),
(12, 10, '5f88390e904c1409461637.jpg', '2020-10-15 13:57:02', 'Description'),
(13, 6, '5f88390e904c1409461637.jpg', '2020-10-14 16:45:17', 'Description');

-- --------------------------------------------------------

--
-- Structure de la table `image_activity`
--

CREATE TABLE `image_activity` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `image_activity`
--

INSERT INTO `image_activity` (`id`, `activity_id`, `description`, `file_name`, `created_at`) VALUES
(1, 1, 'Description', '5f4e96ab918cc479278880.jpg', '2020-09-01 20:44:59'),
(2, 1, 'Description', '5f4e96ab95160723152459.jpg', '2020-09-01 20:44:59');

-- --------------------------------------------------------

--
-- Structure de la table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `rooms` int(11) NOT NULL,
  `surface` double NOT NULL,
  `travelers` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `location`
--

INSERT INTO `location` (`id`, `category_id`, `destination_id`, `name`, `description`, `street`, `postal_code`, `city`, `price`, `rooms`, `surface`, `travelers`, `created_at`, `user_id`, `status`) VALUES
(1, 1, 1, 'Cabane Sur l\'eau', 'Profitez de la nature', '8 Rue Leon frot', '94350', 'Vincennes', 125, 3, 1200, 2, '2020-09-01 15:48:53', 1, 1),
(2, 1, 1, 'Cabane Sur l\'eau', 'Profitez de la nature', '8 Rue Leon frot', '94350', 'Vincennes', 125, 3, 1200, 2, '2020-09-01 15:51:32', 1, 1),
(3, 1, 1, 'Cabane Sur l\'eau', 'Profitez de la nature', '8 Rue Leon frot', '94350', 'Vincennes', 125, 3, 1200, 2, '2020-09-01 15:52:47', 1, 1),
(4, 1, 1, 'Cabane Sur l\'eau', 'Profitez de la nature', '8 Rue Leon frot', '94350', 'Vincennes', 125, 3, 1200, 4, '2020-09-01 15:56:47', 1, 1),
(5, 1, 1, 'Cabane Dans l\'air', 'Des vacances en amoureux ou en Famille', '4 avenue des sablons', '94350', 'Val De Fontenay', 125, 3, 1800, 4, '2020-09-05 16:24:53', 1, 0),
(6, 1, 2, 'Victorien Yanick Kifack', 'Ma cabane a Louer', '7 rue Theophile Gautier, 94350, Chez Romeo Azangue Teffo', '94350', 'Villiers Sur Marne', 100, 3, 255, 3, '2020-10-15 13:31:51', 1, 1),
(7, 1, 4, 'Une jolie bulle', 'Ma Bulle a louer', '3 rue vaudinger', '93350', 'Lille', 120, 2, 12, 4, '2020-10-15 13:40:02', 1, 1),
(10, 1, 3, 'Une jolie bulle', 'In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since. \'Whenever you feel like criticizing anyone,\' he told me, \'just remember that all the people in this world haven\'t had the advantages that you\'ve had', '3 rue vaudinger', '91350', 'Anger', 130, 3, 45, 3, '2020-10-15 13:57:02', 9, 1);

-- --------------------------------------------------------

--
-- Structure de la table `location_thematic`
--

CREATE TABLE `location_thematic` (
  `location_id` int(11) NOT NULL,
  `thematic_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `location_thematic`
--

INSERT INTO `location_thematic` (`location_id`, `thematic_id`) VALUES
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(7, 2),
(10, 2),
(10, 3);

-- --------------------------------------------------------

--
-- Structure de la table `outsider`
--

CREATE TABLE `outsider` (
  `id` int(11) NOT NULL,
  `legal_represent_id` int(11) NOT NULL,
  `denomination` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_siret` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `other_information_addresse` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_naf` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cuntry` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `form_legal` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `outsider`
--

INSERT INTO `outsider` (`id`, `legal_represent_id`, `denomination`, `number_siret`, `street`, `other_information_addresse`, `city`, `code_naf`, `cuntry`, `form_legal`, `date_created`, `date_modified`) VALUES
(1, 9, 'BNP Paribas', 's58sd5', 'Rue des sablons', 'Data scientist', 'Lyon', 'rd85', 'France', 'forme legale', '2020-10-12 23:30:31', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `name` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_stripe` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `card_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exp_date` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cvc` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `comment` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` smallint(6) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `thematic`
--

CREATE TABLE `thematic` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `thematic`
--

INSERT INTO `thematic` (`id`, `name`, `description`, `created_at`, `file_name`, `author_id`) VALUES
(1, 'Romantique', 'Voyage en Amoureux', '2020-08-31 23:37:01', '5f4d6d7d668e0598665227.jpeg', 1),
(2, 'Famille', 'Weekend en famille', '2020-09-01 11:58:44', '5f4e1b5488e33215405882.jpeg', 1),
(3, 'Sport', 'Faire du sky', '2020-10-04 07:24:40', '5f795c988d0e7175626448.jpg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rue` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_of_birth` date NOT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modified` datetime DEFAULT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `name`, `last_name`, `phone`, `rue`, `city`, `status`, `date_of_birth`, `zip_code`, `date_created`, `date_modified`, `reference`) VALUES
(1, 'kifack@gmail.com', '[\"ROLE_ADMIN\",\"ROLE_OWNER\"]', '$argon2id$v=19$m=65536,t=4,p=1$dWM2aWRiUDROT0tEZ0k2YQ$jTS8JJQSLM6Nm+gPv1Cf3zH+w0bdh/Lkq/T0GN4+TOc', 'Kifack', 'Yanick', '0768874103', '7 Rue Theophile Gautier', 'Villiers Sur Marne', 1, '1995-02-15', '1525', '2020-09-01 12:19:32', NULL, 'REP5f4e20346e61b'),
(2, 'kenfack@gmail.com', '[]', '$argon2id$v=19$m=65536,t=4,p=1$cFouVk1hNmRRZTUvaFFDSA$QyRR/vdPUie49fNN0T9yM54k/7IzYDC9deMsfe+KPtg', 'Kenfack', 'Midrel', '0868475210', '18 rue Président Kennedy', 'Marseille', 1, '1994-11-05', '98452', '2020-10-12 22:47:10', NULL, 'REP5f84c0cf02866'),
(3, 'donfack@gmail.com', '[]', '$argon2id$v=19$m=65536,t=4,p=1$akZPaWZYbWVZb09mR2s1Zg$zkSIqMGHmp/N7SYouEwc6bM1Jl72but1eCD/TBKtYo8', 'Donfack', 'Sorelle', '0868585210', '18 rue didier', 'Lyon', 1, '1994-11-05', '98852', '2020-10-12 23:13:33', NULL, 'REP5f84c6fdd465c'),
(9, 'john@gmail.com', '[\"ROLE_OWNER\"]', '$argon2id$v=19$m=65536,t=4,p=1$S29YaHFZMjRTRlRneEJYSg$PLyOPyfO8VS4lq5Y/QHeNdFU1MTyFw/slNY1xb74iOw', 'John', 'Doe', '0887585210', '7 rue vaucresson', 'Paris', 1, '1994-11-05', '92152', '2020-10-12 23:30:31', NULL, 'REP5f84caf83f079');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_AC74095A64D218E` (`location_id`),
  ADD KEY `IDX_AC74095AA76ED395` (`user_id`);

--
-- Index pour la table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_E00CEDDE64D218E` (`location_id`),
  ADD KEY `IDX_E00CEDDE9395C3F3` (`customer_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_64C19C1F675F31B` (`author_id`);

--
-- Index pour la table `choice_item`
--
ALTER TABLE `choice_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4A849A3D443707B0` (`field_id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9474526CF675F31B` (`author_id`),
  ADD KEY `IDX_9474526CED775E23` (`locations_id`),
  ADD KEY `IDX_9474526C2A4DB562` (`activities_id`);

--
-- Index pour la table `destination`
--
ALTER TABLE `destination`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5BF5455812469DE2` (`category_id`);

--
-- Index pour la table `field_value`
--
ALTER TABLE `field_value`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_36D0CECF443707B0` (`field_id`),
  ADD KEY `IDX_36D0CECF64D218E` (`location_id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_C53D045F64D218E` (`location_id`);

--
-- Index pour la table `image_activity`
--
ALTER TABLE `image_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_238487F281C06096` (`activity_id`);

--
-- Index pour la table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5E9E89CB12469DE2` (`category_id`),
  ADD KEY `IDX_5E9E89CB816C6140` (`destination_id`),
  ADD KEY `IDX_5E9E89CBA76ED395` (`user_id`);

--
-- Index pour la table `location_thematic`
--
ALTER TABLE `location_thematic`
  ADD PRIMARY KEY (`location_id`,`thematic_id`),
  ADD KEY `IDX_AD49FD9064D218E` (`location_id`),
  ADD KEY `IDX_AD49FD902395FCED` (`thematic_id`);

--
-- Index pour la table `outsider`
--
ALTER TABLE `outsider`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_530913BD2BCE81B3` (`legal_represent_id`);

--
-- Index pour la table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_6D28840D3301C60` (`booking_id`);

--
-- Index pour la table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_794381C6A76ED395` (`user_id`),
  ADD KEY `IDX_794381C664D218E` (`location_id`);

--
-- Index pour la table `thematic`
--
ALTER TABLE `thematic`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `choice_item`
--
ALTER TABLE `choice_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `destination`
--
ALTER TABLE `destination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `field`
--
ALTER TABLE `field`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `field_value`
--
ALTER TABLE `field_value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `image_activity`
--
ALTER TABLE `image_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `outsider`
--
ALTER TABLE `outsider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `thematic`
--
ALTER TABLE `thematic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `FK_AC74095A64D218E` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `FK_AC74095AA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FK_E00CEDDE64D218E` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `FK_E00CEDDE9395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_64C19C1F675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `choice_item`
--
ALTER TABLE `choice_item`
  ADD CONSTRAINT `FK_4A849A3D443707B0` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`);

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_9474526C2A4DB562` FOREIGN KEY (`activities_id`) REFERENCES `activity` (`id`),
  ADD CONSTRAINT `FK_9474526CED775E23` FOREIGN KEY (`locations_id`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `FK_9474526CF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `field`
--
ALTER TABLE `field`
  ADD CONSTRAINT `FK_5BF5455812469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Contraintes pour la table `field_value`
--
ALTER TABLE `field_value`
  ADD CONSTRAINT `FK_36D0CECF443707B0` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`),
  ADD CONSTRAINT `FK_36D0CECF64D218E` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK_C53D045F64D218E` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Contraintes pour la table `image_activity`
--
ALTER TABLE `image_activity`
  ADD CONSTRAINT `FK_238487F281C06096` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

--
-- Contraintes pour la table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `FK_5E9E89CB12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_5E9E89CB816C6140` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  ADD CONSTRAINT `FK_5E9E89CBA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `location_thematic`
--
ALTER TABLE `location_thematic`
  ADD CONSTRAINT `FK_AD49FD902395FCED` FOREIGN KEY (`thematic_id`) REFERENCES `thematic` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AD49FD9064D218E` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `outsider`
--
ALTER TABLE `outsider`
  ADD CONSTRAINT `FK_530913BD2BCE81B3` FOREIGN KEY (`legal_represent_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FK_6D28840D3301C60` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`);

--
-- Contraintes pour la table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_794381C664D218E` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `FK_794381C6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
