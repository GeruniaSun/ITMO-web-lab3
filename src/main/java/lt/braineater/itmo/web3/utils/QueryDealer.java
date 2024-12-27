package lt.braineater.itmo.web3.utils;

public class QueryDealer {

    public static final String SELECT_ALL_ATTEMPTS = """
            SELECT * FROM attempts;
            """;

    public static final String INSERT_ATTEMPT = """
            INSERT INTO attempts(x, y, r, hit, curr_time)
            VALUES(?, ?, ?, ?, ?)
            RETURNING id;
            """;


    public static final String CREATE_TABLES = """
            CREATE TABLE IF NOT EXISTS attempts (
                id SERIAL PRIMARY KEY,
                x FLOAT NOT NULL,
                y FLOAT NOT NULL,
                r INTEGER NOT NULL,
                hit BOOLEAN NOT NULL,
                curr_time VARCHAR(50) NOT NULL
            );
            """;
}
/*
CREATE TABLE attempts (
    id SERIAL PRIMARY KEY,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    r INTEGER NOT NULL,
    hit BOOLEAN NOT NULL,
    curr_time VARCHAR(50) NOT NULL
);
*/