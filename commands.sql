
-- CREATE TABLE courses
CREATE TABLE courses (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
credits INTEGER NOT NULL,
duration INTEGER NOT NULL
);

-- INSERT DATA in courses
INSERT INTO courses (name , credits  , duration)
VALUES ('maths'   , 4  ,  3),
('science'   , 4  ,  3),
('sports'   , 4  ,  3);


-- CREATE TABLE students
CREATE TABLE students (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
courseId INTEGER,
birthDate DATE NOT NULL,
age INTEGER NOT NULL,
  FOREIGN KEY (courseId) REFERENCES courses(id)
);

-- INSERT DATA in students
INSERT INTO students (name , courseId  , birthDate   , age)
VALUES ('rahul'   , 2  ,  '2002-10-23'   , 12), ('mahesh'   , 1  ,  '2006-07-21'   , 28), ('rahul'   , 3  ,  '2024-01-03'   , 20)
,('keyur'   , 1  ,  '2023-02-04'   , 22) , ('yuvi'   , 1  ,  '2023-02-04'   , 22)   ,('mayo'   , 1  ,  '2023-02-04'   , 22);

-- ALTER TABLE
ALTER TABLE students 
ADD COLUMN colors TEXT;

ALTER TABLE students 
ADD COLUMN grad TEXT;

ALTER TABLE students 
ADD COLUMN email TEXT;




-- ADD INDEX 
CREATE INDEX idx_age ON students(age);

-- UPDATE TABLE
UPDATE students
SET  colors = 'red'
WHERE courseId = '1';

UPDATE students
SET  colors = 'blue'
WHERE courseId = '2';

UPDATE students
SET  colors = 'green'
WHERE courseId = '3';


-- Update Multiple Records
UPDATE students
SET grad = age + 1
FROM courses
WHERE  courses.name = 'maths';

--  QUERY
SELECT students.name , students.age FROM students
JOIN courses ON courses.id = students.courseId
WHERE courses.name = 'sports';

-- AGGRIGATION
SELECT AVG(credits) as average FROM courses;
SELECT SUM(credits) as sum FROM courses;
SELECT COUNT(*) as count FROM courses;
SELECT MAX(credits) AS max FROM courses;


-- DELETE 
DELETE FROM students
WHERE name = 'yuvi';

-- GROUP
SELECT students.name, courses.name
FROM students
JOIN courses ON students.courseId = courses.id
ORDER BY courses.name ASC;

-- Subqueries
SELECT * FROM students
WHERE age = (SELECT MAX(age)  FROM students);

CREATE VIEW studentDetail AS
SELECT students.name    , students.age   ,  courses.name   as courseName FROM students
JOIN courses ON students.courseId = courses.id
ORDER BY courses.name;

SELECT * FROM studentDetail;


-- Count Students by Age
SELECT 
  CASE
    WHEN age >= 0 AND age >= 10  THEN '0-10'
   WHEN age >= 11 AND age >= 20  THEN '11-20'
   WHEN age >= 11 AND age >= 20  THEN '21-30'
  ELSE 'More Than 30'
END as ageGroup  , COUNT(*) AS studentCount
FROM students
GROUP BY ageGroup;


--  Find Students with Recent Birthdays
SELECT * FROM students
WHERE extract(Month from birthDate)  =   extract(Month from CURRENT_DATE);


-- Uniqu Ages
WITH UniqueAges AS (
SELECT age FROM students
GROUP By age
HAVING COUNT(*) = 1
)
SELECT students.age  , students.name FROM students
JOIN UniqueAges ON UniqueAges.age = students.age;


-- Count Students by Color

SELECT colors,
COUNT(*) AS studentCount
FROM students
GROUP by colors;



SELECT * FROM students;
SELECT * FROM courses;

