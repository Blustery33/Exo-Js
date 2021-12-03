
-- create role userdoodle login password 'secret';

-- create database doodle template template0 encoding utf8 owner userdoodle;

drop table if exists personne cascade;
drop table if exists evenement;
drop table if exists evenement_personne;
drop table if exists reponse;
drop table if exists datev;
drop table if exists datev;
drop table if exists date_personne;

create table personne (
  id     bigserial NOT NULL,
  pseudo varchar(50) default NULL,
  email  varchar(75) not NULL,
  mdp    varchar(50) default NULL,
  creele timestamp default now(),
  primary key  (id)
) ;

alter table personne owner to userdoodle;

create table evenement (
  id      bigserial NOT NULL,
  libelle varchar(128) default NULL,
  auteur  bigint,
  creele  timestamp default now(),
  primary key  (id),
  foreign key (auteur) references personne(id)
);

alter table evenement owner to userdoodle;

create table evenement_personne (
    idEvenement bigint,
    idPersonne  bigint,
    creele      timestamp default now(),
    foreign key (idEvenement) references evenement(id),
    foreign key (idPersonne) references personne(id)
);

alter table evenement_personne owner to userdoodle;

-- La table reponse contient les réponses possibles 
create table reponse (
  id          bigserial NOT NULL,
  idEvenement bigint,
  libelle     varchar(128) default NULL,
  couleur     varchar(32),
  creele      timestamp default now(),
  primary key  (id),
  foreign key (idEvenement) references evenement(id)
);

alter table reponse owner to userdoodle;

-- DATEV contient les dates des événements
create table datev (
    id      bigserial NOT NULL,
    date_ev date not null,
    idEvenement bigint,
    primary key  (id),
    foreign key (idEvenement) references evenement(id)
);

alter table datev owner to userdoodle;

create table date_personne (
    idDate      bigserial NOT NULL,
    idPersonne  bigint,
    idReponse   bigint,
    foreign key (idDate) references datev(id),
    foreign key (idPersonne) references personne(id),
    foreign key (idReponse) references reponse(id)
);

alter table date_personne owner to userdoodle;


insert into personne (pseudo,email,mdp) values ('bob','bob@audiens.fr','secret');
insert into personne (pseudo,email,mdp) values ('tom','tom@audiens.fr','secret');
insert into personne (pseudo,email,mdp) values ('bill','bill@audiens.fr','secret');
insert into personne (pseudo,email,mdp) values ('eric','eric.clapton@audiens.fr','secret');
insert into personne (pseudo,email,mdp) values ('jimmy','jimmy.hendrix@audiens.fr','secret');
insert into personne (pseudo,email,mdp) values ('al','al.dimeola@audiens.fr','secret');
insert into personne (pseudo,email,mdp) values ('albert','albert.einstein@audiens.fr','secret');


insert into evenement (libelle,auteur) values ('Enterrement de vie de garçon de Bob',1);
insert into evenement (libelle,auteur) values ('Anniversaire de Tom',2);
insert into evenement (libelle,auteur) values ('Réunion CODIR',3);

insert into reponse (idEvenement,libelle,couleur) values (1,'Disponible','#00ff00');
insert into reponse (idEvenement,libelle,couleur) values (1,'Non disponible','#ff0000');
insert into reponse (idEvenement,libelle,couleur) values (2,'Disponible','#00ff00');
insert into reponse (idEvenement,libelle,couleur) values (2,'Non disponible','#ff0000');
insert into reponse (idEvenement,libelle,couleur) values (3,'Disponible','#00ff00');
insert into reponse (idEvenement,libelle,couleur) values (3,'Non disponible','#ff0000');

insert into datev (idEvenement,date_ev) values (1,'2022-01-15');
insert into datev (idEvenement,date_ev) values (1,'2022-01-16');
insert into datev (idEvenement,date_ev) values (1,'2022-01-19');
insert into datev (idEvenement,date_ev) values (1,'2022-01-20');

insert into datev (idEvenement,date_ev) values (2,'2022-02-15');
insert into datev (idEvenement,date_ev) values (2,'2022-02-16');
insert into datev (idEvenement,date_ev) values (2,'2022-02-19');
insert into datev (idEvenement,date_ev) values (2,'2022-02-20');
insert into datev (idEvenement,date_ev) values (2,'2022-02-24');
insert into datev (idEvenement,date_ev) values (2,'2022-02-25');

insert into datev (idEvenement,date_ev) values (3,'2022-03-02');
insert into datev (idEvenement,date_ev) values (3,'2022-03-09');
insert into datev (idEvenement,date_ev) values (3,'2022-03-16');
insert into datev (idEvenement,date_ev) values (3,'2022-03-23');
insert into datev (idEvenement,date_ev) values (3,'2022-03-30');


insert into evenement_personne (idEvenement,idPersonne) values (1,1);
insert into evenement_personne (idEvenement,idPersonne) values (1,2);
insert into evenement_personne (idEvenement,idPersonne) values (1,3);
insert into evenement_personne (idEvenement,idPersonne) values (1,4);

insert into evenement_personne (idEvenement,idPersonne) values (2,1);
insert into evenement_personne (idEvenement,idPersonne) values (2,2);
insert into evenement_personne (idEvenement,idPersonne) values (2,5);
insert into evenement_personne (idEvenement,idPersonne) values (2,6);

insert into evenement_personne (idEvenement,idPersonne) values (3,3);
insert into evenement_personne (idEvenement,idPersonne) values (3,7);
insert into evenement_personne (idEvenement,idPersonne) values (3,5);