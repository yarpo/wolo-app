"use client";

import React, { useState, useEffect } from 'react';
import EventCard from '../../Components/EventCard/EventCard';
import '../../styles/all-events.scss';
import '../../styles/they-need-you.scss';
import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';
import { Banner } from "flowbite-react";
import { HiX, HiLightBulb  } from "react-icons/hi";

const TheyNeedYouEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData(URLS.THEY_NEED_YOU, setEvents);
}, []);

  return (
    <div id="container">
        <div className='they_need_you_banner_container'>
            <Banner>
                <div className="flex w-full justify-between border-b border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-700" id="they_need_you_banner">
                    <div className="mx-auto flex items-center">
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        <HiLightBulb  className="mr-4 h-4 w-4" id="they_need_you_icon" />
                        <span className="[&_p]:inline">
                            Te wydarzenia odbywają się już niedługo, a nie uzyskały pełnej liczby wolontariuszy. Być może czekają właśnie na Ciebie!&nbsp;
                        </span>
                    </p>
                    </div>
                    <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                    <HiX className="h-4 w-4" />
                    </Banner.CollapseButton>
                </div>
            </Banner>
        </div>
      <div className='all_events_cards'>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default TheyNeedYouEvents;