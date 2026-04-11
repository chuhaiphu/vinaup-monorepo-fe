"use client";

import { Text } from "@mantine/core";
import classes from "./landing-footer.module.scss";
import Link from "next/link";
import { IAppConfigResponse } from "@/interfaces/app-config-interface";

interface LandingFooterContainerProps {
  config?: IAppConfigResponse;
}

export default function LandingFooterContainer({
  config,
}: LandingFooterContainerProps) {
  return (
    <footer className={classes.wrapper}>
      <div className={classes.card}>
        <div className={classes.content}>
          <div className={classes.leftCol}>
            <Text className={classes.label}>Nhận làm tóc theo lịch hẹn</Text>
            <Text className={classes.highlightText}>
              <span className={classes.bookingPrefix}>Booking: </span>
              {config?.phoneContact || "0981 824 770"}
            </Text>
            <div className={classes.linkGroup}>
              <Link href="#" className={classes.link}>
                Zalo
              </Link>

              <Link href="#" className={classes.link}>
                Messenger
              </Link>
            </div>
          </div>

          <div className={classes.rightCol}>
            <Text className={classes.label}>Thời gian phục vụ</Text>
            <Text className={classes.highlightText}>9h - 19h30</Text>
            <Text className={classes.subText}>Tất cả các ngày trong tuần</Text>
          </div>
        </div>
      </div>

      <div className={classes.copyright}>
        <Text>
          <Link href="/" className={classes.brand}>
            Jenahair{" "}
          </Link>{" "}
          © 2026 by Vinaup
        </Text>
      </div>
    </footer>
  );
}
