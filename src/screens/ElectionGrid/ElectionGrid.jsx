import Footer from '../../components/common/Footer/Footer';
import TestHeader from '../../components/common/TestHeader/TestHeader';
import { Route, Switch } from 'react-router-dom';
import ElectionProvince from '../../components/ElectionGrid/Province/ElectionProvince';
import ElectionCounties from '../../components/ElectionGrid/Counties/ElectionCounties';
import ElectionUnions from '../../components/ElectionGrid/Unions/ElectionUnions';
import ElectionCandidates from '../../components/ElectionGrid/Candidates/ElectionCandidates';


const ElectionGrid = () => {
  return (
    <div>
      <TestHeader />
      <Switch>
        <Route path="/Election/Province" exact component={ElectionProvince} />
         <Route path="/Election/Counties/:id" exact component={ElectionCounties} />
         <Route path="/Election/Unions/:id" exact component={ElectionUnions} />
         <Route path="/Election/Candidates/:id" exact component={ElectionCandidates} />

      </Switch>
      <Footer />
    </div>
  );
};

export default ElectionGrid;
