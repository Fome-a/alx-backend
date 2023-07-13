#!/usr/bin/python3
"""
a class LFUCache that inherits
from BaseCaching and is a caching system:
"""


from enum import Enum
from heapq import heappush, heappop
from itertools import count


BaseCaching = __import__("base_caching").BaseCaching


class HeapItemStatus(Enum):
    """
    HeapItemStatus bascecaching for caching system
    """
    ACTIVE = 1
    INACTIVE = 2


class LFUCache(BaseCaching):
    """LFUCache basecaching class"""

    def __init__(self):
        """
        Initializer
        """
        super().__init__()
        self.heap = []
        self.map = {}
        self.counter = count()

    def put(self, key, item):
        """put: creates"""
        if key and item:
            if key in self.cache_data:
                self.rehydrate(key)
            else:
                if self.is_full():
                    self.evict()
                self.add_to_heap(key)
            self.cache_data[key] = item

    def get(self, key):
        """get: reterievs """
        if key in self.cache_data:
            self.rehydrate(key)
            return self.cache_data.get(key)

    def is_full(self):
        """check number of items"""
        return len(self.cache_data) >= self.MAX_ITEMS

    def evict(self):
        """evict"""
        while self.heap:
            _, __, item, status = heappop(self.heap)
            if status == HeapItemStatus.ACTIVE:
                print("DISCARD: " + str(item))
                del self.cache_data[item]
                return

    def rehydrate(self, key):
        """ 
        Marks current item as inactive and reinserts 
        updated count back into heap.
        """
        entry = self.map[key]
        entry[-1] = HeapItemStatus.INACTIVE
        self.add_to_heap(key, entry[0])

    def add_to_heap(self, key, count=0):
        """
        Adds a new entry into heap.
        """
        entry = [1 + count, next(self.counter), key, HeapItemStatus.ACTIVE]
        self.map[key] = entry
        heappush(self.heap, entry)
