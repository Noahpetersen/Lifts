import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import CurrentDate from "../components/CurrentDate";
import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";
import { Progress } from "@/components/ui/progress";
import Loading from "../components/Loading";
import SetDetails from "../components/SetDetails";
import { Badge } from "@/components/ui/badge";
import RegisterSetForm from "../components/RegisterSetForm";
import { Drawer } from "@/components/ui/drawer";
import TimerDrawer from "../components/TimerDrawer";

type SetData= {
  weight: number,
  reps: number,
  sessionExerciseID?: number,
  exerciseSet?: number
}

type CurrentExercise = {
  name: string,
  currentSet: number
}

const SessionDetail = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const registerSet = useMutation({
    mutationFn: (setData: SetData[]) => {
      return fetch('/api/set/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setData)
      })
    },
    onSuccess: async (response) => {
      if (response.ok) {
        await response.json()
        navigate('/completed');
      }
    }
  })

  const [sets, setSets] = useState<SetData[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSetIndex, setCurrentSetIndex] = useState(1)
  const [currentExercise, setCurrentExercise] = useState<CurrentExercise>({name: "", currentSet: 0})
  const [progress, setProgress] = useState(0)
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false)

  const { data: session, isLoading, error, isFetched } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/session/start-session/?sessionId=${sessionId}`);
      return res.json();
    },
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (session) {
      setCurrentExercise({ 
        name: session[0].exercises[currentExerciseIndex].name, 
        currentSet: currentSetIndex 
      });
    }
  }, [session, currentExerciseIndex, currentSetIndex]);

  useEffect(() => {
    if (session) {
      const totalSets = session[0].exercises.reduce((acc: number, exercise: any) => acc + exercise.sets, 0);
      const completedSets = sets.length;
      setProgress((completedSets / totalSets) * 100);
    }
  }, [sets, session]);

  const registerSetData = (setData: SetData) => {
    const { session_exercise_id } = session[0].exercises[currentExerciseIndex];
    const set: SetData = { ...setData, sessionExerciseID: session_exercise_id, exerciseSet: currentSetIndex }

    const isLastExerciseSet = currentExerciseIndex === session[0].exercises.length - 1;
    const isLastSetInExercise = currentSetIndex === session[0].exercises[currentExerciseIndex].sets;
    const isLastSetInSession = isLastExerciseSet && isLastSetInExercise;
    
    setSets((prevSets) => {
      const updatedSets = [...prevSets, set];
      

      if (isLastSetInSession) {
        console.log("Sending sets:", updatedSets);
        registerSet.mutate(updatedSets);
      }

      return updatedSets;
    });

    if(isLastSetInSession) {
      return;
    }
    else if (currentSetIndex === session[0].exercises[currentExerciseIndex].sets) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(1);

      setIsTimerOpen(true);

      window.scrollTo(0, 0);
    } else {
      setCurrentSetIndex(currentSetIndex + 1);
      setIsTimerOpen(true);
      window.scrollTo(0, 0);
    }

  } 

  if (isLoading) return <Loading/>;
  if (error) return <p>Failed to load session</p>;
  if(isFetched) {
    //console.log(session)
  }

  return (
    <>
      <Navbar/>
      <div className="flex flex-col h-full p-10">
          <header className="flex flex-col pb-2">
              <h1 className="text-3xl font-bold mb-2">{session[0].name}</h1>
              <div className="flex items-center">
                <h2 className="">{currentExercise.name}</h2>
                <Badge className="ml-auto">Set {currentSetIndex}</Badge>
              </div>
          </header>
          <div className="relative">
            <Progress value={progress} className="mb-6 sticky top-0"/>
          </div>
          <SetDetails 
            sessionExerciseID={session[0].exercises[currentExerciseIndex].session_exercise_id} 
            exerciseSet={currentSetIndex}
          />
      </div>
      <RegisterSetForm 
        sessionExerciseID={session[0].exercises[currentExerciseIndex].session_exercise_id} 
        exerciseSet={currentSetIndex}
        registerSetData={registerSetData}
      />
      <TimerDrawer isOpen={isTimerOpen} setIsOpen={setIsTimerOpen}/>

    </>
  );
};

export default SessionDetail;