INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (1,'Fakultet tehničkih nauka','Novi Sad');
INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (2,'Prirodno matematički fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (3, 'Tehnološki fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (4,'Pravni fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (5,'Medicinski fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (6,'Poljoprivredni fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id","naziv","sediste")
	VALUES (-100,'Naziv test', 'Sediste test');

--id, naziv, oznaka, faks
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (1, 'Departman za arhitekturu i urbanizam', 'DAU', 1);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (2, 'Departman za proizvodno mašinstvo', 'DPM', 1);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (3, 'Departman za saobraćaj', 'DS', 1);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (4, 'Departman za industrijsko inženjerstvo i menadžment', 'DIIM', 1);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (5, 'Departman za matematiku i informatiku', 'DMI', 2);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (6, 'Departman za hemiju, biohemiju i zaštitu životne sredine', 'DHBH', 2);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (7, 'Departman za fiziku', 'DF', 2);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (8, 'Departman za geografiju, turizam i hotelijerstvo', 'DGTH', 2);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (9, 'Departman za prehrambeno inženjerstvo', 'DPI', 3);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (10, 'Departman za biotehnologiju', 'DBT', 3);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (11, 'Departman za hemijsko inženjerstvo', 'DHI', 3);	
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (12, 'Katedra za krivično pravo', 'KKP', 4);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (13, 'Katedra za javno pravo', 'KJP', 4);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (14, 'Katedra privredno pravnih nauka', 'KPPN', 4);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (15, 'Katedra za epidemiologiju', 'KEL', 5);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (16, 'Katedra za internu medicinu', 'KIM', 5);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (17, 'Katedra za pedijatriju', 'KP', 5);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (18, 'Departman za stočarstvo', 'DSC', 6);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (19, 'Departman za veterinarsku medicinu', 'DVM', 6);
INSERT INTO "departman"("id","naziv","oznaka","fakultet")
	VALUES (-100, 'Test naziv', 'TO',1);	
	
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (1, 'Budžetski student', 'BS');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (2, 'Samofinansirajući student', 'SFS');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (3, 'Gostujući student', 'GS');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (4, 'Student sa posebnim potrebama', 'SPP');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (5, 'Student na daljinu', 'SD');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (-100, 'Naziv test', 'TO');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (9, 'Student', 'SDd');
INSERT INTO "status"("id","naziv","oznaka")
	VALUES (10, 'Student', 'SDd');
	
--id, ime, pry, brind, status, dep
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (1, 'Željana', 'Amidžić', 'IT25/2018', 1, 4);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (2, 'Dragan', 'Šurlan', 'KM10/2016', 2, 2);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (3, 'Ana', 'Petrović', 'PM5/2017', 3, 5);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (4, 'Sanja', 'Simov', 'IP18/2019', 5, 9);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (5, 'Doroteja', 'Gašić', 'BT8/2020', 4, 10);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (6, 'Marko', 'Milanković', 'HT55/2016', 1, 11);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (7, 'Siniša', 'Atanacković', 'KP9/2018', 1, 12);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (8, 'Milica', 'Stankov', 'VMT15/2018', 1, 19);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (9, 'Nemanja', 'Antić', 'ST25/2019', 5, 18);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (10, 'Ana', 'Slavnić', 'DP5/2019', 4, 17);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (11, 'Milutin', 'Draškov', 'IIM28/2017', 2, 4);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (12, 'Đorđe', 'Perić', 'KM16/2020', 2, 2);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (13, 'Marija', 'Todorović', 'TIM1/2017', 2, 16);
INSERT INTO "student"("id","ime","prezime","broj_indeksa","status","departman")
	VALUES (-100, 'Test ime', 'Test prezime', 'T1/1000', 1, 1);