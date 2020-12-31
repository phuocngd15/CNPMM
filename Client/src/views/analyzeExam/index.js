import React, { useEffect } from 'react';
const AnalyzeExam = () => {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const reqModel = {
        url: `http://localhost:9999/api/Fullexam/one`,
        id: id
      };
      dispatch(getExam(reqModel));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <h1>thống kê</h1>;
};


// điểm thi cao nhất, thấp nhất => sơ đồ cột

// sở đồ đường, tần suất làm bài thi
const

export default AnalyzeExam;
