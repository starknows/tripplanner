import React from 'react'
import { Route, Link, Switch, useParams } from 'react-router-dom'
import Itinerary from '../../pages/Itinerary'
import CardListPublic from '../main/CardListPublic'

function Test() {
  let { id } = useParams()
  return <h1>{id}</h1>
}

function ItinRoute() {
  return (
    <Switch>
      <Route path="/itinerary/view/:id">
        <Test />
      </Route>
      <Route path="/itinerary/test">
        <CardListPublic />
      </Route>
      <Route exact path="/itinerary">
        <Itinerary />
      </Route>
    </Switch>
  )
}

export default ItinRoute