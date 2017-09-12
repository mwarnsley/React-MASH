import React from 'react';
import {map} from 'lodash';
import {Grid, Row, Col, Panel, Well} from 'react-bootstrap';

const Results = ({results}) => {
  const displayResults = map(results, (r, i) => {
    return (
      <Col key={i} xs={12} md={3}>
        <Well>
          <Panel>
            <h3 className={r.title.toLowerCase() + ' result-header'}>{r.title}</h3>
            <p className="result-value">{r.value}</p>
          </Panel>
        </Well>
      </Col>
    );
  });
  return (
    <Grid>
      <Row>{displayResults}</Row>
    </Grid>
  );
};

export default Results;
