-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: db6
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addictive`
--

DROP TABLE IF EXISTS `addictive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addictive` (
  `addictiveId` int NOT NULL AUTO_INCREMENT,
  `smoking` enum('สูบ','ไม่สูบ','เคยสูบ') NOT NULL,
  `smokingPeriod` int DEFAULT NULL,
  `cigaretteNumber` int DEFAULT NULL,
  `cigaretteButt` enum('มีก้นกรอง','ไม่มีก้นกรอง') DEFAULT NULL,
  `alcohol` enum('ไม่ดื่ม','ดื่ม') NOT NULL,
  `typeAlcohol` varchar(255) DEFAULT NULL,
  `alcoholGlass` int DEFAULT NULL,
  `nut` enum('ไม่เคย','เคย') NOT NULL,
  `nutPeriod` int DEFAULT NULL,
  `alcoholPeriod` int DEFAULT NULL,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  PRIMARY KEY (`addictiveId`),
  KEY `fk_addictive_patient1_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_addictive_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addictive`
--

LOCK TABLES `addictive` WRITE;
/*!40000 ALTER TABLE `addictive` DISABLE KEYS */;
INSERT INTO `addictive` VALUES (1,'ไม่สูบ',NULL,NULL,NULL,'ไม่ดื่ม',NULL,NULL,'ไม่เคย',NULL,NULL,'0000000000001','000001'),(2,'ไม่สูบ',NULL,NULL,NULL,'ไม่ดื่ม',NULL,NULL,'ไม่เคย',NULL,NULL,'0000000000002','000002'),(3,'ไม่สูบ',NULL,NULL,NULL,'ไม่ดื่ม',NULL,NULL,'ไม่เคย',NULL,NULL,'0000000000003','000003'),(4,'ไม่สูบ',NULL,NULL,NULL,'ไม่ดื่ม',NULL,NULL,'ไม่เคย',NULL,NULL,'0000000000004','000004');
/*!40000 ALTER TABLE `addictive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergy`
--

DROP TABLE IF EXISTS `allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergy` (
  `allergyId` int NOT NULL AUTO_INCREMENT,
  `allergyDetail` longtext NOT NULL,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  PRIMARY KEY (`allergyId`),
  KEY `fk_allergy_patient1_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_allergy_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy`
--

LOCK TABLES `allergy` WRITE;
/*!40000 ALTER TABLE `allergy` DISABLE KEYS */;
INSERT INTO `allergy` VALUES (1,'ไม่มีประวัติการแพ้','0000000000001','000001'),(2,'ไม่มีประวัติการแพ้','0000000000002','000002'),(3,'ไม่มีประวัติการแพ้','0000000000003','000003'),(4,'ไม่มีประวัติการแพ้','0000000000004','000004');
/*!40000 ALTER TABLE `allergy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointId` int NOT NULL AUTO_INCREMENT,
  `appointDate` datetime NOT NULL,
  `appoint_no` int NOT NULL,
  `note` longtext,
  `medGiver` varchar(255) DEFAULT NULL,
  `treatmentId` int NOT NULL,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  PRIMARY KEY (`appointId`),
  KEY `fk_appointment_patient1_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_appointment_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (26,'2024-04-29 08:00:00',1,NULL,'นักคมี1 สกุลเคมี1',1,'0000000000001','000001'),(27,'2024-05-06 09:00:00',2,NULL,'นักคมี1 สกุลเคมี1',1,'0000000000001','000001'),(28,'2024-05-07 10:00:00',3,NULL,'นักคมี1 สกุลเคมี1',1,'0000000000001','000001'),(29,'2024-05-08 07:31:00',4,NULL,'นักคมี1 สกุลเคมี1',1,'0000000000001','000001'),(30,'2024-05-09 20:37:00',5,NULL,'นักคมี1 สกุลเคมี1',1,'0000000000001','000001'),(31,'2024-05-10 20:38:00',6,NULL,NULL,1,'0000000000001','000001');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bloodresult`
--

DROP TABLE IF EXISTS `bloodresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bloodresult` (
  `brId` int NOT NULL AUTO_INCREMENT,
  `picture` longtext,
  `date` timestamp NULL DEFAULT NULL,
  `suggestion` longtext,
  `status` enum('ยังไม่ส่งผลเลือด','รออนุมัติผลเลือด','อนุมัติผลเลือด','ส่งผลเลือดอีกครั้ง') NOT NULL,
  `doctorId` int NOT NULL,
  `treatmentId` int NOT NULL,
  PRIMARY KEY (`brId`),
  KEY `fk_bloodresult_doctor1_idx` (`doctorId`),
  KEY `fk_bloodresult_treatment2_idx` (`treatmentId`),
  CONSTRAINT `fk_bloodresult_doctor1` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`doctorId`),
  CONSTRAINT `fk_bloodresult_treatment2` FOREIGN KEY (`treatmentId`) REFERENCES `treatment` (`treatmentId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bloodresult`
--

LOCK TABLES `bloodresult` WRITE;
/*!40000 ALTER TABLE `bloodresult` DISABLE KEYS */;
INSERT INTO `bloodresult` VALUES (1,'images/1714117218527_.jpg','2024-04-26 07:41:00',NULL,'อนุมัติผลเลือด',12,1),(4,NULL,NULL,NULL,'ยังไม่ส่งผลเลือด',15,4);
/*!40000 ALTER TABLE `bloodresult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancer`
--

DROP TABLE IF EXISTS `cancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancer` (
  `cancerId` int NOT NULL AUTO_INCREMENT,
  `cancerType` varchar(255) NOT NULL,
  PRIMARY KEY (`cancerId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancer`
--

LOCK TABLES `cancer` WRITE;
/*!40000 ALTER TABLE `cancer` DISABLE KEYS */;
INSERT INTO `cancer` VALUES (1,'มะเร็งปอด'),(2,'มะเร็งกระเพาะอาหาร'),(3,'มะเร็งลำไส้ใหญ่'),(4,'มะเร็งตับ'),(5,'มะเร็งตับอ่อน'),(6,'มะเร็งต่อมไทรอยด์'),(7,'มะเร็งไต'),(8,'มะเร็งกระเพาะปัสสาวะ'),(9,'มะเร็งอัณฑะ'),(10,'มะเร็งต่อมลูกหมาก'),(11,'มะเร็งถุงน้ำดี'),(12,'มะเร็งมดลูก'),(13,'มะเร็งเต้านม'),(14,'มะเร็งรังไข่');
/*!40000 ALTER TABLE `cancer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancer_patient`
--

DROP TABLE IF EXISTS `cancer_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancer_patient` (
  `cancerId` int NOT NULL,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  `cancerState` int NOT NULL,
  PRIMARY KEY (`cancerId`,`IDcard`,`HN`),
  KEY `fk_cancer_has_patient_patient1_idx` (`IDcard`,`HN`),
  KEY `fk_cancer_has_patient_cancer1_idx` (`cancerId`),
  CONSTRAINT `fk_cancer_has_patient_cancer1` FOREIGN KEY (`cancerId`) REFERENCES `cancer` (`cancerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cancer_has_patient_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancer_patient`
--

LOCK TABLES `cancer_patient` WRITE;
/*!40000 ALTER TABLE `cancer_patient` DISABLE KEYS */;
INSERT INTO `cancer_patient` VALUES (3,'0000000000003','000003',1),(4,'0000000000003','000003',4),(6,'0000000000001','000001',2),(10,'0000000000001','000001',4);
/*!40000 ALTER TABLE `cancer_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diseases`
--

DROP TABLE IF EXISTS `diseases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diseases` (
  `diseasesId` int NOT NULL AUTO_INCREMENT,
  `disease` longtext,
  `usualMed` longtext,
  `otherTreatment` longtext,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  PRIMARY KEY (`diseasesId`),
  KEY `fk_diseases_patient1_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_diseases_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseases`
--

LOCK TABLES `diseases` WRITE;
/*!40000 ALTER TABLE `diseases` DISABLE KEYS */;
INSERT INTO `diseases` VALUES (1,'','','','0000000000001','000001'),(2,'เบาหวาน','','','0000000000002','000002'),(3,'เบาหวาน','','','0000000000003','000003'),(4,'เบาหวาน','','','0000000000004','000004');
/*!40000 ALTER TABLE `diseases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctorId` int NOT NULL,
  PRIMARY KEY (`doctorId`),
  CONSTRAINT `fk_doctor_user` FOREIGN KEY (`doctorId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (8),(9),(10),(11),(12),(13),(14),(15),(16),(17);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedbackId` int NOT NULL AUTO_INCREMENT,
  `patientSideEffect` longtext,
  `sideEfflevel` varchar(255) DEFAULT NULL,
  `appointId` int NOT NULL,
  `sendAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`feedbackId`),
  KEY `fk_feedback_appointment2_idx` (`appointId`),
  CONSTRAINT `fk_feedback_appointment2` FOREIGN KEY (`appointId`) REFERENCES `appointment` (`appointId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (26,NULL,'1',26,NULL),(27,NULL,NULL,27,NULL),(28,NULL,NULL,28,NULL),(29,NULL,NULL,29,NULL),(30,NULL,NULL,30,NULL),(31,NULL,NULL,31,NULL);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formula`
--

DROP TABLE IF EXISTS `formula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formula` (
  `formulaId` int NOT NULL AUTO_INCREMENT,
  `formulaName` varchar(255) NOT NULL,
  `numberOfRound` int NOT NULL,
  `period` int NOT NULL,
  PRIMARY KEY (`formulaId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formula`
--

LOCK TABLES `formula` WRITE;
/*!40000 ALTER TABLE `formula` DISABLE KEYS */;
INSERT INTO `formula` VALUES (1,'AC',6,7),(2,'FAC',6,7),(3,'Cis CCRT Cervix',6,7),(4,'Carbo CCRT Cervix',6,7),(5,'5FU-Leucovorin',6,7),(6,'Pac-Carbo',6,7);
/*!40000 ALTER TABLE `formula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formula_medicine`
--

DROP TABLE IF EXISTS `formula_medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formula_medicine` (
  `medId` int NOT NULL,
  `formulaId` int NOT NULL,
  PRIMARY KEY (`medId`,`formulaId`),
  KEY `fk_medicine_has_formula_formula1_idx` (`formulaId`),
  KEY `fk_medicine_has_formula_medicine1_idx` (`medId`),
  CONSTRAINT `fk_medicine_has_formula_formula1` FOREIGN KEY (`formulaId`) REFERENCES `formula` (`formulaId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_medicine_has_formula_medicine1` FOREIGN KEY (`medId`) REFERENCES `medicine` (`medId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formula_medicine`
--

LOCK TABLES `formula_medicine` WRITE;
/*!40000 ALTER TABLE `formula_medicine` DISABLE KEYS */;
INSERT INTO `formula_medicine` VALUES (1,1),(2,1),(1,2),(2,2),(3,2),(4,3),(5,4),(3,5),(6,5),(5,6),(7,6);
/*!40000 ALTER TABLE `formula_medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `givemed`
--

DROP TABLE IF EXISTS `givemed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `givemed` (
  `giveMedId` int NOT NULL AUTO_INCREMENT,
  `medType` enum('รับประทาน','ฉีดเข้าเส้นเลือด') NOT NULL,
  `unit` float NOT NULL,
  `tablet` int DEFAULT NULL,
  `medId` int NOT NULL,
  `formulaId` int NOT NULL,
  `treatmentId` int NOT NULL,
  PRIMARY KEY (`giveMedId`),
  KEY `fk_giveMed_formula_medicine1_idx` (`medId`,`formulaId`),
  KEY `fk_giveMed_treatment1_idx` (`treatmentId`),
  CONSTRAINT `fk_giveMed_formula_medicine1` FOREIGN KEY (`medId`, `formulaId`) REFERENCES `formula_medicine` (`medId`, `formulaId`),
  CONSTRAINT `fk_giveMed_treatment1` FOREIGN KEY (`treatmentId`) REFERENCES `treatment` (`treatmentId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `givemed`
--

LOCK TABLES `givemed` WRITE;
/*!40000 ALTER TABLE `givemed` DISABLE KEYS */;
INSERT INTO `givemed` VALUES (1,'ฉีดเข้าเส้นเลือด',200,NULL,4,3,1);
/*!40000 ALTER TABLE `givemed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guidebook`
--

DROP TABLE IF EXISTS `guidebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guidebook` (
  `guidebookId` int NOT NULL AUTO_INCREMENT,
  `formulaId` int NOT NULL,
  `pdf` longtext,
  `QRcode` longtext,
  PRIMARY KEY (`guidebookId`),
  KEY `fk_guidebook_formula1_idx` (`formulaId`),
  CONSTRAINT `fk_guidebook_formula1` FOREIGN KEY (`formulaId`) REFERENCES `formula` (`formulaId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guidebook`
--

LOCK TABLES `guidebook` WRITE;
/*!40000 ALTER TABLE `guidebook` DISABLE KEYS */;
INSERT INTO `guidebook` VALUES (1,1,'images/1714193685032_.pdf','images/1714193672793_.jpg'),(2,2,'images/1714193807134_.pdf','images/1714193796884_.jpg'),(3,3,'images/1714193834574_.pdf','images/1714193822005_.jpg'),(4,4,NULL,NULL),(5,5,NULL,NULL),(6,6,NULL,NULL);
/*!40000 ALTER TABLE `guidebook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `historyId` int NOT NULL AUTO_INCREMENT,
  `fatherName` varchar(255) DEFAULT NULL,
  `motherName` varchar(255) DEFAULT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `spouseName` varchar(255) DEFAULT NULL,
  `relatedAs` varchar(255) NOT NULL,
  `IDcardAddress` longtext NOT NULL,
  `currentAddress` longtext NOT NULL,
  `contactAddress` longtext NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `education` varchar(255) NOT NULL,
  `marriageStatus` varchar(255) NOT NULL,
  `bloodGroup` varchar(255) NOT NULL,
  `religious` varchar(255) DEFAULT NULL,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  PRIMARY KEY (`historyId`),
  KEY `fk_history_patient2_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_history_patient2` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,'ชื่อบิดา1','ชื่อมารดา1','ชื่อญาติ1','','พี่ชาย','บ้านเลขที่ xxxx หมู่ xxxxx ซอย xxxx ถนน xxxxxxx ตำบล/แขวง xxxxxx อำเภอ/เขต xxxx จังหวัด กรุงเทพมหานคร โทร. -','บ้านเลขที่ xxx หมู่ xxxx ซอย xxxxx ถนน xxxxx ตำบล/แขวง xxxxxxx อำเภอ/เขต xxxx จังหวัด กรุงเทพมหานคร โทร. -','บ้านเลขที่ xxxxx หมู่ xxxx ซอย xxxx ถนน xxxx ตำบล/แขวง xxxx อำเภอ/เขต xxxxxx จังหวัด กรุงเทพมหานคร โทร. -','ไทย','รับจ้าง','ปวส. หรือเทียบเท่าอนุปริญญา','โสด','AB (เอบี)','พุทธ','0000000000001','000001'),(2,'ชื่อบิดา2 นามสกุลบิดา2','ชื่อมารดา2 นามสกุลมารดา2','ชื่อญาติ2 นามสกุลญาติ2','','พี่สาว','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด กรุงเทพมหานคร โทร. xxxxxxxxxx','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด กรุงเทพมหานคร โทร. xxxxxxxxxx','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด กรุงเทพมหานคร โทร. xxxxxxxxxx','ไทย','ค้าขาย','ปวช.','โสด','O (โอ)','พุทธ','0000000000002','000002'),(3,'','','ชื่อญาติ3 นามสกุลญาติ3','','พี่สาว','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด ฉะเชิงเทรา โทร. ','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด ฉะเชิงเทรา โทร. ','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด ฉะเชิงเทรา โทร. ','ไทย','พนักงานบริษัท','ปริญญาตรี','โสด','O (โอ)','พุทธ','0000000000003','000003'),(4,'','','ชื่อญาติ4 นามสกุลญาติ4','','พี่สาว','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด กรุงเทพมหานคร โทร. ','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด กรุงเทพมหานคร โทร. ','บ้านเลขที่ xxx หมู่ x ซอย xxx ถนน xxx ตำบล/แขวง xxx อำเภอ/เขต xxxxx จังหวัด กรุงเทพมหานคร โทร. ','ไทย','พนักงานบริษัท','ปริญญาตรี','โสด','O (โอ)','พุทธ','0000000000004','000004');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine` (
  `medId` int NOT NULL AUTO_INCREMENT,
  `medName` varchar(255) NOT NULL,
  PRIMARY KEY (`medId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES (1,'Adriamycin'),(2,'Cyclophosphamine'),(3,'Fluorouracil'),(4,'Cisplatin'),(5,'Carboplatin'),(6,'Leucovorin'),(7,'Paciltaxel');
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notiId` int NOT NULL AUTO_INCREMENT,
  `notify` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL,
  `notiStatus` enum('อ่านแล้ว','ยังไม่อ่าน') NOT NULL,
  `HN` varchar(6) NOT NULL,
  `IDcard` varchar(13) NOT NULL,
  `type` enum('ผลเลือด','ผลข้างเคียง','ขอเลื่อน') NOT NULL,
  PRIMARY KEY (`notiId`),
  KEY `fk_notification_patient1_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_notification_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `HN` varchar(6) NOT NULL,
  `prefix` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `IDcard` varchar(13) NOT NULL,
  `gender` enum('ชาย','หญิง') NOT NULL,
  `doctorId` int DEFAULT NULL,
  `allergy` enum('ไม่เคยแพ้','แพ้') NOT NULL,
  PRIMARY KEY (`IDcard`,`HN`),
  UNIQUE KEY `IDcard_UNIQUE` (`IDcard`),
  KEY `fk_patient_doctor2_idx` (`doctorId`),
  CONSTRAINT `fk_patient_doctor2` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`doctorId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('000001','นาย','ชื่อสมมติ1','นามสกุลสมมติ1','1991-04-17','ปปปปปปปปปป','0000000000001','ชาย',10,'ไม่เคยแพ้'),('000002','นาย','ชื่อสมมติ2','นามสกุลสมมติ2','1958-04-10','xxxxxxxxxx','0000000000002','ชาย',NULL,'ไม่เคยแพ้'),('000003','นาย','ชื่อสมมติ3','นามสกุลสมมติ3','1994-04-10','xxxxxxxxxx','0000000000003','ชาย',15,'ไม่เคยแพ้'),('000004','นาย','ชื่อสมมติ4','นามสกุลสมมติ4','1996-05-15','xxxxxxxxxx','0000000000004','ชาย',10,'ไม่เคยแพ้');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `requestId` int NOT NULL AUTO_INCREMENT,
  `newAppointDate` datetime NOT NULL,
  `reason` longtext NOT NULL,
  `requestPhone` varchar(10) NOT NULL,
  `requestStatus` enum('เลื่อนนัดหมายสำเร็จ','รอดำเนินการเลื่อนนัดหมาย','ไม่สามารถเลื่อนนัดหมายได้') NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `appointId` int NOT NULL,
  `requestStamp` timestamp NOT NULL,
  PRIMARY KEY (`requestId`),
  KEY `fk_request_appointment1_idx` (`appointId`),
  CONSTRAINT `fk_request_appointment1` FOREIGN KEY (`appointId`) REFERENCES `appointment` (`appointId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment`
--

DROP TABLE IF EXISTS `treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment` (
  `treatmentId` int NOT NULL AUTO_INCREMENT,
  `formulaId` int NOT NULL,
  `treatmentStatus` enum('อยู่ระหว่างการรักษา','สิ้นสุดแผนการรักษา') NOT NULL,
  `doctorId` int NOT NULL,
  `IDcard` varchar(13) NOT NULL,
  `HN` varchar(6) NOT NULL,
  PRIMARY KEY (`treatmentId`),
  KEY `fk_treatment_formula2_idx` (`formulaId`),
  KEY `fk_treatment_patient1_idx` (`IDcard`,`HN`),
  CONSTRAINT `fk_treatment_formula2` FOREIGN KEY (`formulaId`) REFERENCES `formula` (`formulaId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_treatment_patient1` FOREIGN KEY (`IDcard`, `HN`) REFERENCES `patient` (`IDcard`, `HN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment`
--

LOCK TABLES `treatment` WRITE;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
INSERT INTO `treatment` VALUES (1,3,'อยู่ระหว่างการรักษา',12,'0000000000001','000001'),(4,1,'อยู่ระหว่างการรักษา',15,'0000000000003','000003');
/*!40000 ALTER TABLE `treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `psw` varchar(255) DEFAULT NULL,
  `type` enum('doctor','nurse','chemist','patient','admin') NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName_UNIQUE` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'chemist','$2b$10$rIER/7/t1od4QxTujVI00epmZW30snbCKeBO9KFe4nAsd.fsw2reK','chemist','นักคมี1','สกุลเคมี1'),(2,'chemist2','$2b$10$tJfW3aUfLnD/U3GpUskYZ.fQDwuotZvSxYhGdgJhJWThvYTgMthMi','chemist','นักเคมี2','สกุลเคมี2'),(3,'chemist3','$2b$10$OUM680LFLaOYJuNfsOGNS.YtlGucK1Uyh1imX/Qo.5JCXdwfXF49u','chemist','นักเคมี3','สกุลเคมี3'),(4,'chemist4','$2b$10$qxB60UmVJZQBWmEm8UeFYe8BZbtwYZV23KoT3L077Xnf5/SUoMqu6','chemist','นักเคมี4','สกุลเคมี4'),(5,'chemist5','$2b$10$G8hHDO.mVR6/xGU0cE.ubuAxOfOGV411mKrVRXJcY5v/xHrtI1RGW','chemist','นักเคมี5','สกุลเคมี5'),(6,'nurse1','$2b$10$oedBtKvpMCZilxxrMEUBqeCtNSwBbAmZKFCw6eUTTk.HQmQ6l8K5O','nurse','พยาบาล1','สกุลพยาบาล1'),(7,'nurse2','$2b$10$ACama1hi/H4n7CQK1L3lrO5c2BWu5yZ2/vg7CWKkYP7R4ED23MJdS','nurse','พยาบาล2','สกุลพยาบาล2'),(8,'doctor1','$2b$10$XVY4tSusD7Q7X7gEQKg36O0gJdqDADmyI30uid6gZuHui5P/FdU4e','doctor','แพทย์หนึ่ง','สกุลแพทย์หนึ่ง'),(9,'doctor2','$2b$10$yKOwJIlbpk1E3/8FUD286O9MZLtTVSJ5yr/jCp0BJTAhnjoTZ1FCO','doctor','แพทย์สอง','สกุลแพทย์สอง'),(10,'doctor3','$2b$10$rszwiEJvKkncnSwtr.exB.Spw9BUVWqrvkzcWOBjEsY9zfGAVvMom','doctor','แพทย์สาม','สกุลแพทย์สาม'),(11,'doctor4','$2b$10$2FQ4JXEdxdT.zdjg/TeE6.uVPP/eQUf2sz4Gk8y2FMrfEv81PxBNe','doctor','แพทย์สี่','สกุลแพทย์สี่'),(12,'doctor5','$2b$10$1b9BYMnT7OK.voBvn1j5VOxG.ulo.po4fzGeDrjOE4PCwLyuJTGBG','doctor','แพทย์ห้า','สกุลแพทย์ห้า'),(13,'doctor6','$2b$10$jN6iQOAdzbor0JjwNsE6OeDBFlsCQPa6LF5cAvT9uGyU3YjeRE6gm','doctor','แพทย์หก','สกุลแพทย์หก'),(14,'doctor7','$2b$10$tdaDr5J6MfgI6InNU9s5o.hg/YH0Vz2GKINIxio0idD9.2IU5Amym','doctor','แพทย์เจ็ด','สกุลแพทย์เจ็ด'),(15,'doctor8','$2b$10$J3ajnlukqBqxefv52FtweuGfTHU47Q5/9wTGVL4oLYd/cl7FuVQGm','doctor','แพทย์แปด','สกุลแพทย์แปด'),(16,'doctor9','$2b$10$Is4NXQ97LKg0KFEjBTWvIurmxWSFeH2AiaIvWvUitBPR9Ih5ymzjm','doctor','แพทย์เก้า','สกุลแพทย์เก้า'),(17,'doctor10','$2b$10$AYjWpCiHuKXsYZYDDHuEKefDJB4bY1CSyMGVTV6mzpHKW4iclluFO','doctor','แพทย์สิบ','สกุลแพทย์สิบ'),(18,'0000000000001','$2b$10$CswOVD4l9LlmhGKwN.z5Kuwz5Cx4m03/av3U956LoLVxxE24U828K','patient','ชื่อสมมติ1','นามสกุลสมมติ1'),(19,'0000000000002','$2b$10$VRwUGKgCTSvMflGT9nvYDus.JHGsfNsvecoP5AETQrZv8yjIDvw1O','patient','ชื่อสมมติ2','นามสกุลสมมติ2'),(20,'0000000000003',NULL,'patient','ชื่อสมมติ1','นามสกุลสมมติ1'),(21,'0000000000004',NULL,'patient','ชื่อสมมติ4','นามสกุลสมมติ4');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07 19:26:47
