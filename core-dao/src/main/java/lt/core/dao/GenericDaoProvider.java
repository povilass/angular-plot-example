package lt.core.dao;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;

import java.util.List;

public interface GenericDaoProvider{

    public <T> T query(String select, PreparedStatementSetter params, ResultSetExtractor<T> rs);

}
