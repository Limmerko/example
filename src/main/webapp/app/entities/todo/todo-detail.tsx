import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './todo.reducer';
import { ITODO } from 'app/shared/model/todo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITODODetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TODODetail = (props: ITODODetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tODOEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="exampleApp.tODO.detail.title">TODO</Translate> [<b>{tODOEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="exampleApp.tODO.name">Name</Translate>
            </span>
          </dt>
          <dd>{tODOEntity.name}</dd>
          <dt>
            <span id="number">
              <Translate contentKey="exampleApp.tODO.number">Number</Translate>
            </span>
          </dt>
          <dd>{tODOEntity.number}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="exampleApp.tODO.date">Date</Translate>
            </span>
          </dt>
          <dd>{tODOEntity.date ? <TextFormat value={tODOEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/todo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/todo/${tODOEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tODO }: IRootState) => ({
  tODOEntity: tODO.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TODODetail);
