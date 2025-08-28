-- MySQL dump 10.13  Distrib 9.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: warehouse_mg
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inbound_reciepts`
--

DROP TABLE IF EXISTS `inbound_reciepts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inbound_reciepts` (
  `supplier_name` varchar(255) DEFAULT NULL,
  `items` varchar(255) DEFAULT NULL,
  `item_quantity` int DEFAULT NULL,
  `received_at` datetime DEFAULT NULL,
  `price` float(50,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbound_reciepts`
--

LOCK TABLES `inbound_reciepts` WRITE;
/*!40000 ALTER TABLE `inbound_reciepts` DISABLE KEYS */;
/*!40000 ALTER TABLE `inbound_reciepts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `item` varchar(255) DEFAULT NULL,
  `SKU` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `expiry` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `management_staff`
--

DROP TABLE IF EXISTS `management_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_staff` (
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management_staff`
--

LOCK TABLES `management_staff` WRITE;
/*!40000 ALTER TABLE `management_staff` DISABLE KEYS */;
INSERT INTO `management_staff` VALUES ('user1@gmail.com','admin','$2y$10$uUr59PwKIiz7E7xE1brAsePg5xRq2LUsNu/u4rHcBcoKBuDSf5LAS'),('user2@gmail.com','admin','$2y$10$ZWM7cz.XvGFU7Qn6IT88DuIjLSH/BD3TM.APhcA9rn8HoS4nJP8tW');
/*!40000 ALTER TABLE `management_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outbound_shipments`
--

DROP TABLE IF EXISTS `outbound_shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outbound_shipments` (
  `client_name` varchar(255) DEFAULT NULL,
  `items` varchar(255) DEFAULT NULL,
  `item_quantity` int DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `price` float(50,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outbound_shipments`
--

LOCK TABLES `outbound_shipments` WRITE;
/*!40000 ALTER TABLE `outbound_shipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `outbound_shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending_approvals`
--

DROP TABLE IF EXISTS `pending_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pending_approvals` (
  `client_name` varchar(255) DEFAULT NULL,
  `amoount` float(50,2) DEFAULT NULL,
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_approvals`
--

LOCK TABLES `pending_approvals` WRITE;
/*!40000 ALTER TABLE `pending_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `pending_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_alerts`
--

DROP TABLE IF EXISTS `stock_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_alerts` (
  `item_name` varchar(255) DEFAULT NULL,
  `price` float(50,2) DEFAULT NULL,
  `current_stock` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_alerts`
--

LOCK TABLES `stock_alerts` WRITE;
/*!40000 ALTER TABLE `stock_alerts` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_a`
--

DROP TABLE IF EXISTS `warehouse_a`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_a` (
  `stock` int DEFAULT NULL,
  `staff` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_a`
--

LOCK TABLES `warehouse_a` WRITE;
/*!40000 ALTER TABLE `warehouse_a` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_a` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_b`
--

DROP TABLE IF EXISTS `warehouse_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_b` (
  `stock` int DEFAULT NULL,
  `staff` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_b`
--

LOCK TABLES `warehouse_b` WRITE;
/*!40000 ALTER TABLE `warehouse_b` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_c`
--

DROP TABLE IF EXISTS `warehouse_c`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_c` (
  `stock` int DEFAULT NULL,
  `staff` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_c`
--

LOCK TABLES `warehouse_c` WRITE;
/*!40000 ALTER TABLE `warehouse_c` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_c` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-27 21:03:23
