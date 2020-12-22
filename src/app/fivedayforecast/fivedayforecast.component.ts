import { Component, OnInit } from '@angular/core';
import { disconnect } from 'process';

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.scss']
})
export class FivedayforecastComponent implements OnInit {
  fiveDaysForcastArray = [
    {
      'day' : 'Sunday',
      'date' : '11/3',
      'detail1' : 'Mix of sunny with cloud',
      'detail2' : 45,
      'detail3' : 41,
      'detail4' : 30,
      'detail5' : '12N',
      'detail6' : 41,
      'detail7' : '2H'
    },
    {
      'day' : 'Monday',
      'date' : '11/4',
      'detail1' : 'Mix of sunny with cloud',
      'detail2' : 45,
      'detail3' : 41,
      'detail4' : 30,
      'detail5' : '12N',
      'detail6' : 41,
      'detail7' : '2H'
    },
    {
      'day' : 'Tuesday',
      'date' : '11/5',
      'detail1' : 'Mix of sunny with cloud',
      'detail2' : 45,
      'detail3' : 41,
      'detail4' : 30,
      'detail5' : '12N',
      'detail6' : 41,
      'detail7' : '2H'
    },
    {
      'day' : 'Wednesday',
      'date' : '11/6',
      'detail1' : 'Mix of sunny with cloud',
      'detail2' : 45,
      'detail3' : 41,
      'detail4' : 30,
      'detail5' : '12N',
      'detail6' : 41,
      'detail7' : '2H'
    },
    {
      'day' : 'Thursday',
      'date' : '11/7',
      'detail1' : 'Mix of sunny with cloud',
      'detail2' : 45,
      'detail3' : 41,
      'detail4' : 30,
      'detail5' : '12N',
      'detail6' : 41,
      'detail7' : '2H'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
