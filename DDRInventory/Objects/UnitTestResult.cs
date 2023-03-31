namespace DDRInventory.Objects
{
    public class UnitTestResult
    {
        public string TestName { get; set; }
        public int TestNumber { get; set; }
        public bool Passed { get; set; }
        public string ExpectedValue { get; set; }
        public string ActualValue { get; set; }

        public override string ToString()
        {
            if (Passed)
                return $"UNIT TEST {TestNumber}. {TestName} PASSED";
            else 
                return $"UNIT TEST {TestNumber}. {TestName} FAILED\nThe expected value was: {ExpectedValue}\nThe result was: {ActualValue}";
        }
    }
}
