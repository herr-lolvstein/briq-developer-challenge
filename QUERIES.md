### Queries

*All users with their id, username, balance, the date at which they received Briqs for the last time, the date at which they gave Briqs for the last time
~~~~ SQL
SELECT u.id, u.username, u.balance, tfrom.max AS lastReceive, tto.max AS lastGive
FROM users u
JOIN
    (SELECT MAX("createdAt"), "userFromId"
    FROM transactions
    GROUP BY "userFromId") tfrom
        ON tfrom."userFromId"=u.id
JOIN
    (SELECT MAX("createdAt"), "userToId"
    FROM transactions
    GROUP BY "userToId") tto
        ON tto."userToId"=u.id ORDER BY id;
~~~~
*All users (including deleted ones) with their id, username, balance, the number of Briqs they received and the number of Briqs they gave.
~~~~ SQL
SELECT u.id, u.username, u.balance, tto.sum AS totalReceived, tfrom.sum AS totalGiven
FROM users u
RIGHT JOIN
    (SELECT SUM(amount), "userFromId"
        FROM transactions
        GROUP BY "userFromId") tfrom
        ON tfrom."userFromId"=u.id
RIGHT JOIN
    (SELECT SUM(amount), "userToId"
    FROM transactions
    GROUP BY "userToId") tto
    ON tto."userToId"=u.id
ORDER BY id;
~~~~
*All users (id, username) that gave Briqs in the last 2 days:
~~~~ SQL
SELECT id, username
FROM users
WHERE id IN
    (SELECT "userFromId"
    FROM transactions
    WHERE "createdAt" > CURRENT_DATE - INTERVAL '2' DAY)
ORDER BY id;
~~~~
*All users (id, username) that gave more than 5 Briqs in one transaction, and the highest number of Briqs they gave
~~~~ SQL
SELECT u.id, u.username, tfrom.max AS highestAmount 
FROM users u
JOIN
    (SELECT "userFromId", MAX(amount)
    FROM transactions
    WHERE "amount" > 5
    GROUP BY "userFromId") tfrom
    ON tfrom."userFromId"=u.id
ORDER BY id;
~~~~
