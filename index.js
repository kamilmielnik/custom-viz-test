const { React } = window.__METABASE_VIZ_API__;
const { jsx: _jsx } = window.__METABASE_VIZ_API__.jsxRuntime;

  const ThumbsVizComponent = (props) => {
    const { height, series, settings, width, onRender } = props;

    React.useEffect(() => {
      onRender({});
    }, [onRender]);

    const { threshold } = settings;
    const value = series[0].data.rows[0][0];

    if (typeof value !== "number" || typeof threshold !== "number") {
      throw new Error("Value and threshold need to be numbers");
    }

    const emoji = value >= threshold ? "\u{1F44D}" : "\u{1F44E}";

    return _jsx("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
        fontSize: 64,
      },
      children: emoji,
    });
  };

  export const createThumbsViz = ({}) => {
    return {
      id: "thumbs-viz",
      getName: () => "Thumbs",
      minSize: { width: 1, height: 1 },
      defaultSize: { width: 2, height: 2 },
      isSensible({ cols, rows }) {
        return cols.length === 1 && rows.length === 1 && typeof rows[0][0] === "number";
      },
      checkRenderable(series, settings) {
        if (series.length !== 1) {
          throw new Error("Only 1 series is supported");
        }
        const [{ data: { cols, rows } }] = series;
        if (cols.length !== 1) {
          throw new Error("Query results should only have 1 column");
        }
        if (rows.length !== 1) {
          throw new Error("Query results should only have 1 row");
        }
        if (typeof rows[0][0] !== "number") {
          throw new Error("Result is not a number");
        }
        if (typeof settings.threshold !== "number") {
          throw new Error("Threshold setting is not set");
        }
      },
      settings: {
        threshold: {
          id: "1",
          title: "Threshold",
          widget: "number",
          getDefault() {
            return 0;
          },
          getProps() {
            return {
              options: { isInteger: false, isNonNegative: false },
              placeholder: "Set threshold",
            };
          },
        },
      },
      VisualizationComponent: ThumbsVizComponent,
    };
  };
  export default createThumbsViz;
