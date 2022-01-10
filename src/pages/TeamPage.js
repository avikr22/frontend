import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {
    const [team, setTeam] = useState({matches : []}); 
    const { teamName } = useParams();
    useEffect(
        //This function cant be async so we are making one more function inside
        // and marking that async
        ()=> {
            const fetchMatches = async() => {
                //await because fetch returns a promise
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                setTeam(data);
            };
            fetchMatches();
        },[teamName]   //by passing the second argument [] we tell useEffect to run this 
               // only for the first time and then when teamName changes 
    );
    if (!team || !team.teamName) {
        return <h1>Team not found</h1>
    }

    if(!team || !team.teamName) {
        return <h1>Team Not Found</h1>
    }
    return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
      {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match}/>)}
    </div>
  );
}

