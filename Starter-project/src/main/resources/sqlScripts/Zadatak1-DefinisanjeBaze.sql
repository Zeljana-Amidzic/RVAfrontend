DROP TABLE IF EXISTS fakultet CASCADE;
DROP TABLE IF EXISTS departman CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS status CASCADE;

CREATE TABLE fakultet
(
	id integer not null,
	naziv varchar(100) not null,
	sediste varchar(50) not null
);

CREATE TABLE departman
(
	id integer not null,
	naziv varchar(100) not null,
	oznaka varchar(10),
	fakultet integer not null
);

CREATE TABLE student
(
	id integer not null,
	ime varchar(50) not null,
	prezime varchar(50) not null,
	broj_indeksa varchar(20) not null,
	status integer not null,
	departman integer not null
);

CREATE TABLE status
(
	id integer not null,
	naziv varchar(100) not null,
	oznaka varchar(10) not null
);

ALTER TABLE fakultet
	ADD CONSTRAINT pk_fakultet PRIMARY KEY(id);
	
ALTER TABLE departman
	ADD CONSTRAINT pk_departman PRIMARY KEY(id);
	
ALTER TABLE student
	ADD CONSTRAINT pk_student PRIMARY KEY(id);
	
ALTER TABLE status
	ADD CONSTRAINT pk_status PRIMARY KEY(id);
	
ALTER TABLE departman
	ADD CONSTRAINT fk_departman_fakultet FOREIGN KEY (fakultet) REFERENCES fakultet(id);
	
ALTER TABLE student
	ADD CONSTRAINT fk_student_status FOREIGN KEY (status) REFERENCES status(id);
ALTER TABLE student
	ADD CONSTRAINT fk_student_departman FOREIGN KEY (departman) REFERENCES departman(id);
	
CREATE INDEX idxpk_fakultet ON fakultet(id);
CREATE INDEX idxpk_departman ON departman(id);
CREATE INDEX idxpk_student ON student(id);
CREATE INDEX idxpk_status ON status(id);

CREATE INDEX idxfk_departman_fakultet ON departman(fakultet);
CREATE INDEX idxfk_student_status ON student(status);
CREATE INDEX idxfk_student_departman ON student(departman);

CREATE SEQUENCE fakultet_seq INCREMENT 1;
CREATE SEQUENCE departman_seq INCREMENT 1;
CREATE SEQUENCE student_seq INCREMENT 1;
CREATE SEQUENCE status_seq INCREMENT 1;



