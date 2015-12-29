package lt.core.dao;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

public class BalancedDataSource implements GenericDaoProvider {

    public Logger logger = Logger.getLogger(BalancedDataSource.class.getName());

    public DataSource dataSource;

    public JdbcTemplate jdbcTemplate;

    public BalancedDataSource() {
    }

    public BalancedDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        query("SELECT * FROM  users", null, new ResultSetExtractor<Object>() {
            public Object extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                if (resultSet.next()) {
                    logger.info("ID: " + resultSet.getInt("id") + " name: " + resultSet.getString("user_name") + " password: " + resultSet.getString("password"));
                }
                return null;
            }
        });
    }


    public <T> T query(String select, PreparedStatementSetter params, ResultSetExtractor<T> rs) {
        return jdbcTemplate.query(select, params, rs);
    }
}