import React, { useState, useContext, useEffect } from "react";
import { Text, H1, Container, Select, Button } from "../../GlobalStyles/styles";
import useERC20 from "../../hooks/useErc20";
import useForm from "../../hooks/useForm";
import useReward from "../../hooks/useStakingReward";
import StakeManagerContext from "../../context/StakeManager";

const Balances = () => {
  const selectedPool = useForm({ type: "select" });
  const [balance, setBalance] = useState("Please select a token");
  const [balanceStake, setBalanceStake] = useState("Please select a token");
  const { poolAddress } = useContext(StakeManagerContext);
  const { balanceOf } = useERC20({
    address: selectedPool?.value ? JSON.parse(selectedPool?.value).token : "",
  });

  const { balanceOf: balanceOfStake } = useReward({
    address: selectedPool?.value ? JSON.parse(selectedPool?.value).address : "",
  });

  useEffect(() => {
    (async () => {
      const actualBalance = await balanceOf();
      setBalance(actualBalance);

      const actualBalanceStake = await balanceOfStake();
      setBalanceStake(actualBalanceStake);
    })();
  }, [selectedPool.value, balanceOf, balanceOfStake]);

  return (
    <Container with="80vw" margin="0 auto" padding="0 20px">
      <Container align="center">
        <H1>Check your balance on our available coins pools</H1>
        <Text>Balance token: {balance}</Text>
        <Text>Balance Stake: {balanceStake}</Text>
      </Container>
      <Container margin="5rem 0" align="center">
        <Select {...selectedPool}>
          <option value="">Select a coin</option>
          {poolAddress?.map((pool) => (
            <option key={pool.address} value={JSON.stringify(pool)}>
              {pool.symbol}
            </option>
          ))}
        </Select>
      </Container>
    </Container>
  );
};

export default Balances;
