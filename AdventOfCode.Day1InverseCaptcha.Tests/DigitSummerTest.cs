using System;
using JetBrains.Annotations;
using Xunit;

namespace AdventOfCode.Day1InverseCaptcha.Tests
{
    public class DigitSummerTest
    {
        private IDigitSummer _summer = new DigitSummer();

        [Theory]
        [InlineData("1212", 6)]
        [InlineData("1221", 0)]
        [InlineData("123425", 4)]
        [InlineData("123123", 12)]
        [InlineData("12131415", 4)]
        public void TestSumDigits(string digits, int result)
        {
            Assert.Equal(result, _summer.SumMatchingDigits(digits));
        }

        [Theory]
        [InlineData("123123", 0, 1)]
        [InlineData("123123", 1, 2)]
        [InlineData("123123", 2, 3)]
        [InlineData("123123", 3, 1)]
        [InlineData("123123", 4, 2)]
        [InlineData("123123", 5, 3)]
        [InlineData("123425", 0, 0)]
        [InlineData("123425", 1, 2)]
        [InlineData("123425", 2, 0)]
        [InlineData("123425", 3, 0)]
        [InlineData("123425", 4, 2)]
        [InlineData("123425", 5, 0)]
        public void TestMatchDigit(string digits, int pos, int result)
        {
            Assert.Equal(result, _summer.MatchDigit(digits, pos));
        }
    }
}
