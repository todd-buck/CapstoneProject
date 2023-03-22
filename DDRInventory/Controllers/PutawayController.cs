﻿using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;

namespace DDRInventory.Controllers
{
    [ApiController]
    public class PutawayController : ControllerBase
    {
        [HttpPost("/api/putaway/add")]
        public void add(PutawayEntry newEntry)
        {
            try
            {
                PutawayEntryContext.Add(newEntry);
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
            }
        }

        [HttpGet("/api/putaway/location/{locationId}")]
        public PutawayEntry[] getByLocation(int locationId)
        {
            try
            {
                return PutawayEntryContext.GetByLocation(locationId).ToArray();
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new PutawayEntry[0];
            }
        }

        [HttpGet("/api/putaway/item/{itemId}")]
        public PutawayEntry[] getByItem(string itemId)
        {
            try
            {
                return PutawayEntryContext.GetByItem(itemId).ToArray();
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new PutawayEntry[0];
            }
        }

        [HttpPut("/api/putaway/update")]
        public bool update(PutawayEntry updatedEntry)
        {
            try
            {
                return PutawayEntryContext.UpdateEntry(updatedEntry);
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }
    }
}