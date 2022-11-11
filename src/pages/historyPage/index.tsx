import { NavBar, Card } from 'antd-mobile';
import { useHistory } from 'umi';
import { useEffect, useRef, useState } from 'react';
import cardIcon from '@/images/wishes/card-icon.png';
import rest from '@/rest';

import './index.less';
import dayjs from 'dayjs';
type History = {
  created_at: string;
  apply_records: {
    id: number;
    inventory_name: string;
    created_at: string;
    number: string;
    name: string;
  }[];
};
export default () => {
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  const [historyData, setHistoryData] = useState<History[]>([]);
  const ref = useRef<History[]>();
  useEffect(() => {
    rest('/customers/6589/office/records')
      .then((res) => {
        ref.current = [...(res?.data?.records || [])];
      })
      .finally(() => {
        const data = JSON.parse(localStorage.getItem('tools') || '[]') as {
          id: number;
          title: string;
          date: string;
          account: string;
          admin: string;
        }[];
        const obj: Record<
          string,
          {
            created_at: string;
            apply_records: {
              id: number;
              inventory_name: string;
              created_at: string;
              number: string;
              name: string;
            }[];
          }
        > = {};
        if (data.length) {
          obj[dayjs(data[0].date).format('YYYY-MM-DD')] = {
            created_at: dayjs(data[0].date).format('YYYY-MM-DD'),
            apply_records: data.map((item) => ({
              id: item.id,
              inventory_name: item.title,
              created_at: item.date,
              number: item.account,
              name: item.admin,
            })),
          };
          setHistoryData([
            ...(ref.current || []),
            obj[dayjs(data[0].date).format('YYYY-MM-DD')],
          ]);
        }
      });
  }, []);

  // const historyData = [
  //   {
  //     created_at: '2022-11-09',
  //     apply_records: [
  //       {
  //         id: 1,
  //         inventory_name: '清纸巾',
  //         created_at: '2022-11-09 10:45:09',
  //         number: 1,
  //         name: '袁友',
  //       },
  //       {
  //         id: 2,
  //         inventory_name: '电池',
  //         created_at: '2022-11-09 10:49:09',
  //         number: 1,
  //         name: '袁友',
  //       },
  //     ],
  //   },
  //   {
  //     created_at: '2022-10-30',
  //     apply_records: [
  //       {
  //         id: 1,
  //         inventory_name: '清风纸巾',
  //         created_at: '2022-11-09 10:45:09',
  //         number: 1,
  //         name: '袁友',
  //       },
  //       {
  //         id: 2,
  //         inventory_name: '电池',
  //         created_at: '2022-11-09 10:49:09',
  //         number: 1,
  //         name: '袁友',
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {}, []);
  return (
    <div className="history-page">
      <NavBar className="history-nav-bar" onBack={back}>
        领取记录
      </NavBar>
      {historyData.map((item1: any, index1: any) => (
        <div key={index1} className="date-item">
          <span className="date-item-title">{item1.created_at}</span>
          {item1.apply_records.map((item2: any, index2: any) => (
            <Card
              className="things-card"
              key={index2}
              title={
                <div className="card-header">
                  <div className="card-header-left">
                    <img src={cardIcon} alt="" />
                    <span className="card-title">{item2.inventory_name}</span>
                  </div>

                  <span className="card-date"> {item2.created_at}</span>
                </div>
              }
            >
              <div>领取数量: {item2.number}</div>
              <div className="admin-wrapper">发放人: {item2.name}</div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};
