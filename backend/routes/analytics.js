import express from 'express';
import MetaApi from 'metaapi.cloud-sdk';
import { supabase } from '../config/supabase.js';

const router = express.Router();
const API_TOKEN = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiYzQ5N2E0MzFjZGM4ZTE2NWQyODIzNGU5N2YzN2RjZiIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtZXRhc3RhdHMtYXBpIiwibWV0aG9kcyI6WyJtZXRhc3RhdHMtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibXQtbWFuYWdlci1hcGkiLCJtZXRob2RzIjpbIm10LW1hbmFnZXItYXBpOnJlc3Q6ZGVhbGluZzoqOioiLCJtdC1tYW5hZ2VyLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJiaWxsaW5nLWFwaSIsIm1ldGhvZHMiOlsiYmlsbGluZy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiYmM0OTdhNDMxY2RjOGUxNjVkMjgyMzRlOTdmMzdkY2YiLCJpYXQiOjE3NjA5NzIxNDN9.KQZ0WqZevBDyU-UMF6XlYQBfBHSGYaU2StNNNcI36vkqWNQOyEW_5xHyIAXOpw_QFvczQkPnqNHLF2pfqHPXouxk_-A8M6aRyhY59EVKdRECB071vmBzH1NS_X_xHLefU6TgaIy0Tjf3LpfYjO_HTsqX0_znlAiFH_ddqROE9p5jM-HTQphq842Y71vpgPlJM32prce6N7XBlBo3xnai5x_POjPtJ80TBXfwI0NR1fgo3PGtRCHnq0xSjxZsDzrAHimQo9EZgY54bJzSw8ERFVNl_ey2Bo-eP_qJLOFWB20llyFzsEYxhY2Qnw6fTDRChJRvGsxsETlMkbEBQhmBzT6VO1gwfQmcc-7_bxx__fSGKRF4eA56WDoPUSmj-OTgQpyci27KF-kBPoBeorJ3grAalQFoVkSWA7bgpKU07rObUa7KIeZOHLOF7UuSIFFRvS6BagLEkm7Vo9JGj1yCsGYbqQF6ZTumEu5FazxHMnfiebux8jlcv6d-y72esz7ZMuiM2czqcDTzIzNjfenAEzTKSXrfWN4FvyOb5NdrfIuzb1_nUmMfYzCnZDX4YOcUfOmXDG02YEauTtP_YO3kUZaS0j6nFyl9WzkPfQ_L-tbPIh6vtFjm591QgLHyo710I3ObmApqez-Z93DgyDZUIX3Rpr4ivYPg9adX6-uikM8';

const api = new MetaApi(API_TOKEN);
const connections = new Map();

// Helper function to get or create connection
async function getConnection(metaApiId, login, password, server) {
  if (connections.has(metaApiId)) {
    return connections.get(metaApiId);
  }

  try {
    let account;
    try {
      account = await api.metatraderAccountApi.getAccount(metaApiId);
    } catch (error) {
      // Create new account
      account = await api.metatraderAccountApi.createAccount({
        name: `MT5-${login}`,
        type: 'cloud',
        login: login,
        password: password,
        server: server,
        platform: 'mt5',
        magic: 0
      });
      
      await account.deploy();
      await account.waitDeployed();
    }

    const connection = account.getRPCConnection();
    await connection.connect();
    await connection.waitSynchronized();

    connections.set(metaApiId, connection);
    return connection;
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}

// Get real-time MT5 data by user_id
router.get('/mt5-data/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    // Get user's MT5 account from database
    const { data: account, error: dbError } = await supabase
      .from('mt5_accounts')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .single();

    if (dbError || !account) {
      return res.status(404).json({
        success: false,
        error: 'No active MT5 account found for this user'
      });
    }

    // Connect to MT5
    const connection = await getConnection(
      account.id,
      account.account_number,
      account.password,
      account.server
    );

    // Get real-time account information
    const accountInfo = await connection.getAccountInformation();
    const positions = await connection.getPositions();
    const history = await connection.getDealsByTimeRange(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      new Date()
    );

    const closedTrades = history.filter(deal => deal.type === 'DEAL_TYPE_SELL' || deal.type === 'DEAL_TYPE_BUY');
    const profitTrades = closedTrades.filter(t => t.profit > 0);
    const lossTrades = closedTrades.filter(t => t.profit < 0);

    const totalProfit = profitTrades.reduce((sum, t) => sum + t.profit, 0);
    const totalLoss = Math.abs(lossTrades.reduce((sum, t) => sum + t.profit, 0));
    const avgWin = profitTrades.length ? totalProfit / profitTrades.length : 0;
    const avgLoss = lossTrades.length ? totalLoss / lossTrades.length : 0;

    const currentProfit = positions.reduce((sum, p) => sum + p.profit, 0);
    const profitPercentage = ((accountInfo.equity - accountInfo.balance) / accountInfo.balance) * 100;

    const balances = closedTrades.map((_, i) => {
      const balance = accountInfo.balance;
      const change = closedTrades.slice(0, i + 1).reduce((sum, t) => sum + t.profit, 0);
      return balance - currentProfit + change;
    });

    const peakBalance = Math.max(...balances, accountInfo.balance);
    const maxDrawdown = ((peakBalance - Math.min(...balances)) / peakBalance) * 100;

    res.json({
      success: true,
      data: {
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        margin: accountInfo.margin,
        freeMargin: accountInfo.freeMargin,
        marginLevel: accountInfo.marginLevel,
        leverage: accountInfo.leverage,
        currency: accountInfo.currency,
        openTrades: positions.length,
        profit: currentProfit,
        profitPercentage: profitPercentage.toFixed(2),
        totalTrades: closedTrades.length,
        winRate: closedTrades.length ? ((profitTrades.length / closedTrades.length) * 100).toFixed(2) : '0.00',
        averageWin: avgWin.toFixed(2),
        averageLoss: avgLoss.toFixed(2),
        profitFactor: totalLoss ? (totalProfit / totalLoss).toFixed(2) : '0.00',
        maxDrawdown: maxDrawdown.toFixed(2),
        positions: positions.map(p => ({
          id: p.id,
          symbol: p.symbol,
          type: p.type,
          volume: p.volume,
          openPrice: p.openPrice,
          currentPrice: p.currentPrice,
          profit: p.profit,
          openTime: p.time
        })),
        recentTrades: closedTrades.slice(-10).reverse().map(t => ({
          symbol: t.symbol,
          type: t.type,
          volume: t.volume,
          profit: t.profit,
          time: t.time
        })),
        lastUpdate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error fetching MT5 data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch MT5 data',
      message: error.message || 'Unknown error occurred'
    });
  }
});

// Get open positions
router.get('/positions/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data: account } = await supabase
      .from('mt5_accounts')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .single();

    if (!account) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    const connection = await getConnection(
      account.id,
      account.account_number,
      account.password,
      account.server
    );

    const positions = await connection.getPositions();

    res.json({
      success: true,
      data: positions.map(p => ({
        id: p.id,
        symbol: p.symbol,
        type: p.type,
        volume: p.volume,
        openPrice: p.openPrice,
        currentPrice: p.currentPrice,
        profit: p.profit,
        swap: p.swap,
        openTime: p.time
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get ALL trades (complete history)
router.get('/all-trades/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data: account } = await supabase
      .from('mt5_accounts')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .single();

    if (!account) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    const connection = await getConnection(
      account.id,
      account.account_number,
      account.password,
      account.server
    );

    // Get ALL history from account creation
    const accountInfo = await connection.getAccountInformation();
    const allHistory = await connection.getDeals();

    res.json({
      success: true,
      total: allHistory.length,
      data: allHistory.map(t => ({
        id: t.id,
        positionId: t.positionId,
        symbol: t.symbol,
        type: t.type,
        volume: t.volume,
        price: t.price,
        profit: t.profit,
        swap: t.swap,
        commission: t.commission,
        time: t.time,
        comment: t.comment,
        entryType: t.entryType,
        magic: t.magic
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get trading history with date range
router.get('/history/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { days = 30 } = req.query;

    const { data: account } = await supabase
      .from('mt5_accounts')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .single();

    if (!account) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    const connection = await getConnection(
      account.id,
      account.account_number,
      account.password,
      account.server
    );

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - days * 24 * 60 * 60 * 1000);
    const history = await connection.getDealsByTimeRange(startTime, endTime);

    res.json({
      success: true,
      data: history.map(t => ({
        id: t.id,
        symbol: t.symbol,
        type: t.type,
        volume: t.volume,
        profit: t.profit,
        swap: t.swap,
        commission: t.commission,
        time: t.time
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
