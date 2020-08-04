USE [master]

IF db_id('MIT') IS NULl
  CREATE DATABASE [MIT]
GO

USE [MIT]
GO



DROP TABLE IF EXISTS [Incident];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [IndividualTranscript];
DROP TABLE IF EXISTS [Hospital];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
 
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Hospital] (
[Id] integer PRIMARY KEY IDENTITY,
[Name]  nvarchar(50) NOT NULL,
)

CREATE TABLE [Incident] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [ImageLocation] nvarchar(255),
  [Address] nvarchar(555) NOT NULL,
  [Notes] text NOT NULL,
  [BeginDateTime] datetime NOT NULL,
  [EndDateTime] datetime NULL,
  [HospitalId] integer,
  [Drugs] nvarchar(255),
  [Emergency] bit

  CONSTRAINT [FK_Incident_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Incident_Hospital] FOREIGN KEY ([HospitalId]) REFERENCES [Hospital] ([Id]),
	
)

CREATE TABLE [IndividualTranscript] (
  [Id] integer PRIMARY KEY IDENTITY,
  [StartDateTime] datetime NOT NULL,
  [Text] text NOT NULL,
  [IncidentId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_IndividualTranscript_Incident] FOREIGN KEY ([IncidentId]) REFERENCES [Incident] ([Id]),
  CONSTRAINT [FK_IndividualTranscript_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
