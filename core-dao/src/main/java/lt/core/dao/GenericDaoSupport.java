package lt.core.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DaoSupport;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;

import javax.annotation.PostConstruct;
import java.util.List;

public abstract class GenericDaoSupport extends DaoSupport {

    @Autowired
    private GenericDaoProvider provider;


    @PostConstruct
    public void initIt() throws Exception {
        logger.info("SCAN WORKED general dao!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }


    public <T> T query(String select, PreparedStatementSetter params, ResultSetExtractor<T> rs) {

        return provider.query(select, params, rs);
    }


    @Override
    protected final void checkDaoConfig() throws IllegalArgumentException {
        if (this.provider == null) {
            throw new IllegalArgumentException("'provider' is required");
        }
    }
}