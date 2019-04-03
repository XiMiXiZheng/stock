import React from "react";
import { Tabs, Table } from "antd";
import jsonResponse from "./json/20190403.json";
import { groupBy } from "lodash";

export default class StockList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      industries: []
    };
  }

  componentDidMount() {
    this.setup();
  }

  columns = [
    {
      title: "股票代码",
      dataIndex: "stockId"
    },
    {
      title: "股票名称",
      dataIndex: "stockName"
    },
    {
      title: "行业",
      dataIndex: "industry"
    },
    {
      title: "PE(TTM)",
      dataIndex: "pe",
      sorter: (a, b) => a.pe > b.pe,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "ROE(摊薄)",
      dataIndex: "ROE",
      sorter: (a, b) => a.ROE > b.ROE,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "ROE(加权平均)",
      dataIndex: "ROEW",
      sorter: (a, b) => a.ROEW > b.ROEW,
      sortDirections: ["descend", "ascend"]
    }
  ];

  setup = () => {
    this.setState({
      industries: groupBy(jsonResponse.data, stock => stock.industry)
    });
  };

  renderTabItem = () => {
    let tabItems = [];
    for (const industry in this.state.industries) {
      tabItems.push(
        <Tabs.TabPane key={industry} tab={industry} style={{
            height:"calc(100vh - 45px)"
        }}>
          {this.renderTable(industry, this.state.industries[industry])}
        </Tabs.TabPane>
      );
    }
    return tabItems;
  };

  renderTable = (industry, stocks) => {
    return (
      <Table
        columns={this.columns}
        dataSource={stocks}
        pagination={false}
        // scroll={{ y: "calc(100% - 300px)" }}
      />
    );
  };

  render() {
    return (
      <div
        style={{
          height: "calc(100vh - 0px)",
          overflow: "hidden",
        }}
      >
        <Tabs>{this.renderTabItem()}</Tabs>
      </div>
    );
  }
}
