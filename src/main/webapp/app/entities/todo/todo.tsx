import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './todo.reducer';
import { ITODO } from 'app/shared/model/todo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITODOProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TODO = (props: ITODOProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tODOList, match, loading } = props;
  return (
    <div>
      <h2 id="todo-heading">
        <Translate contentKey="exampleApp.tODO.home.title">TODOS</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="exampleApp.tODO.home.createLabel">Create new TODO</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tODOList && tODOList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="exampleApp.tODO.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="exampleApp.tODO.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="exampleApp.tODO.date">Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tODOList.map((tODO, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tODO.id}`} color="link" size="sm">
                      {tODO.id}
                    </Button>
                  </td>
                  <td>{tODO.name}</td>
                  <td>{tODO.number}</td>
                  <td>{tODO.date ? <TextFormat type="date" value={tODO.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tODO.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tODO.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tODO.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="exampleApp.tODO.home.notFound">No TODOS found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tODO }: IRootState) => ({
  tODOList: tODO.entities,
  loading: tODO.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TODO);
