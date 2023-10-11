import { useState } from "react";
import Drawer from "react-bottom-drawer";
import { Vote as IVote, votes } from "../interfaces";
import axios from "axios";
const HOST = import.meta.env.VITE_HOST;

interface VoteProps {
  activeVotes: IVote[] | undefined;
  setActiveVotes: React.Dispatch<React.SetStateAction<IVote[] | undefined>>;
  activeUsers: number;
  userId: string;
}

export const Vote = ({
  activeVotes,
  setActiveVotes,
  activeUsers,
  userId,
}: VoteProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [SelectedVote, setSelectedVote] = useState<votes>(votes.Skip);
  const AddVoteClick = () => {
    console.log("clicked");
    setOpenDrawer((open) => !open);
  };

  const getText = (vote: IVote) => {
    switch (vote.type) {
      case votes.Skip:
        return <div>{"הצבעה עבור להעביר שיר"}</div>;
      case votes.VolumeDown:
        return <div>{"הצבעה עבור להנמיך את השיר"}</div>;
      case votes.VolumeUp:
        return <div>{"הצבעה עבור להגביר את השיר"}</div>;
      default:
        return <div>{""}</div>;
    }
  };

  const doVote = (type: votes) => {
    console.log("execute " + type + " vote");
    let voteRoute = type.toLocaleLowerCase();
    axios(HOST + "/vote/" + voteRoute, {
      method: "get",
      headers: {
        Authorization: userId,
      },
    });
    setOpenDrawer(false);
    setSelectedVote(votes.Skip);
  };

  return (
    <div className="vote-page">
      <div className="votes-div">
        {activeVotes &&
          activeVotes.map((vote) => {
            return (
              <div className="vote-buttom-do">
                <h3 className="h3-bottom-vote-do">
                  {getText(vote)}{" "}
                  <h4 className="info-vote-h4">
                    הצביעו {vote.votes} מתוך {activeUsers}
                  </h4>
                </h3>

                <div onClick={() => doVote(vote.type)} className="vote-to">
                  <h3 className="h3-vote-to1"> ! תצביע </h3>
                </div>
              </div>
            );
          })}
        <Drawer
          className="drawer-vote"
          children={
            <div className="custom-select">
              <div className="do-flex-juc">
                <select
                  onChange={(e) => {
                    setSelectedVote(e.target.value as votes);
                  }}
                >
                  <option value="SKIP">לדלג</option>
                  <option value="VOLUMEUP">להגביר</option>
                  <option value="VOLUMEDOWN">להנמיך</option>
                </select>
              </div>
              <div
                onClick={() => doVote(SelectedVote as votes)}
                className="add-vote-buttom-4"
              >
                <h2 className="add-vote-text4"> ! הוסף הצבעה </h2>
              </div>
            </div>
          }
          isVisible={openDrawer}
          onClose={() => {
            setOpenDrawer((open) => !open);
          }}
        />
      </div>
      <div onClick={AddVoteClick} className="addvote-div">
        <h3 className="add-vote-text">הוסף הצבעה חדשה</h3>
      </div>
    </div>
  );
};
