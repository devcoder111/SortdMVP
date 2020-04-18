import style from './styles.less'

export const content = (
    <div className={style.pageHeaderContent}>
      <p>
        Welcome to the Do-Board. This is mission control for all your projects and tasks.
      </p>

    </div>
  );

  export const extraContent = (
    <div className={style.extraImg}>
      <img
        alt="Dashboard"
        src="https://firebasestorage.googleapis.com/v0/b/sortd-portal.appspot.com/o/assets%2Fdashboard.png?alt=media&token=d9de2043-9f76-48c4-b9ec-5a3309587447"
      />
    </div>
  );