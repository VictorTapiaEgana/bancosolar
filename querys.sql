CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50),
	balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
	id SERIAL PRIMARY KEY,
	emisor INT,
	receptor INT,
	monto FLOAT,
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (emisor) REFERENCES usuarios(id) ON DELETE CASCADE,
	FOREIGN KEY (receptor) REFERENCES usuarios(id) ON DELETE CASCADE
);

ALTER TABLE usuarios
ADD COLUMN genero varchar(20);

ALTER TABLE usuarios
ADD COLUMN fecha_creacion DATE DEFAULT CURRENT_DATE;

UPDATE usuarios SET genero = 'Masculino' WHERE id = 11;

-- DELETE FROM usuarios;

SELECT * FROM usuarios;

SELECT * FROM transferencias;

SELECT t.id, t.fecha AS fecha,emisor.nombre AS emisor,receptor.nombre AS receptor,t.monto AS monto
FROM transferencias t 
JOIN usuarios emisor ON t.emisor = emisor.id 
JOIN usuarios receptor ON t.receptor = receptor.id
ORDER BY t.id ASC;













